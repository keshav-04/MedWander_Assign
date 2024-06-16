import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-dvh items-center">
      <Card className="w-1/3 h-1/3 border-2 border-gray-300 justify-center" shadow={false}>
        <CardBody className="flex flex-col gap-8">
          <Typography variant="h3" color="blue-gray" className="text-center">
            Forms
          </Typography>
          <div className="flex w-full justify-evenly">
            <Button
              color="blue-grey"
              ripple="light"
              className="normal-case"
              onClick={() => {
                navigate("/form/A");
              }}
            >
              Form A
            </Button>
            <Button
              color="blue-grey"
              ripple="light"
              className="normal-case"
              onClick={() => {
                navigate("/form/B");
              }}
            >
              Form B
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
