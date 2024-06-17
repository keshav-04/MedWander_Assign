import { Card, Text, Typography, Button } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const handleRefresh = async () => {
    try {
      const response = await axios.get("http://localhost:3000/form");
      const data = response.data;

      console.log(data);

      const uploadResponse = await axios.post("http://localhost:3000/refresh", 
        data,
      )

      console.log(uploadResponse.data);
    } catch (err) {
      console.log(`Refresh data failed, error - ${err}`);
    }
  };

  return (
    <div className="flex justify-center h-dvh items-center">
      <Card
        className="flex md:w-1/3 h-fit border-2 border-gray-300 p-6 gap-8"
        shadow={false}
      >
        <div className="flex md:flex-row gap-4 flex-col justify-between items-center">
          <Typography variant="h3" color="blue-gray" className="text-center">
            Forms
          </Typography>
          <Button
            color="blue-grey"
            ripple="light"
            className="normal-case w-fit"
            onClick={() => {
              handleRefresh();
            }}
          >
            Refresh
          </Button>
        </div>
        <div className="flex flex-col gap-8 items-center">
          <Button
            color="blue-grey"
            ripple="light"
            className="normal-case w-fit"
            onClick={() => {
              navigate("/form/A");
            }}
          >
            Form A
          </Button>
          <Button
            color="blue-grey"
            ripple="light"
            className="normal-case w-fit"
            onClick={() => {
              navigate("/form/B");
            }}
          >
            Form B
          </Button>
        </div>
        <div>
          Here is the Excel{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/18speQlfLpswRqUveP219LxsGQkDY0Z5uCrAkBGUTMFk/edit?usp=sharing"
            className="underline text-blue-600"
          >
            Link
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Home;
