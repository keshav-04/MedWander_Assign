import { useState, cloneElement } from "react";
import {
  Card,
  Input,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useCountries } from "use-react-countries";
import parsePhoneNumber from "libphonenumber-js";

const Form = () => {
  const { formType } = useParams();
  const { countries } = useCountries();
  const [country, setCountry] = useState(0);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { name, flags, countryCallingCode, emoji } = countries[country];

  const handleSubmit = async () => {
    // console.log(countryCallingCode + phoneNumber, emoji);
    const phoneNumberObj = parsePhoneNumber(countryCallingCode + phoneNumber);
    if (!phoneNumberObj.isValid()) {
      alert("Invalid phone number");
      return;
    }

    try {
      const data = { formType, userName, countryCallingCode, phoneNumber };

      const response = await fetch("http://localhost:3000/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center h-dvh items-center overflow-auto">
      <Card shadow={false} className="border-2 p-8 border-gray-300">
        <Typography variant="h4" color="blue-gray">
          Form {formType}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Fill in the form below.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              size="lg"
              label="Full Name"
              placeholder="John Doe"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Country Code
            </Typography>
            <Select
              size="lg"
              label="Country"
              selected={(element) =>
                element &&
                cloneElement(element, {
                  disabled: true,
                  className:
                    "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                })
              }
            >
              {countries.map(({ name, flags, countryCallingCode }, index) => (
                <Option
                  key={name}
                  value={name}
                  className="flex items-center gap-2"
                  onClick={() => setCountry(index)}
                >
                  <div className="flex gap-2 w-20 justify-center border-r border-gray-600">
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    {countryCallingCode}
                  </div>

                  {name}
                </Option>
              ))}
            </Select>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder="9876543211"
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-end mt-10">
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Form;
