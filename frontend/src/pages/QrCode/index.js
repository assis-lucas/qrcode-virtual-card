import React from "react";
import { useParams, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { CardBody, Typography } from "@material-tailwind/react";
import { CardWrapper } from "./styles";

export default function QrCode() {
  const { slug } = useParams();
  const { state } = useLocation();

  const url = `${process.env.REACT_APP_URL}/${slug}`;
  return (
    <div className="w-full flex justify-center h-screen">
      <CardWrapper className="w-96">
        <div className="h-80 pt-6 flex justify-center align-center ">
          <QRCode size={300} value={url} />
        </div>
        <CardBody className="text-center">
          <Typography variant="h2" className="mb-4 text-gray-500">
            Hey, {state?.name}
          </Typography>
          <Typography variant="h3" className="mb-2 text-gray-500">
            Scan Me
          </Typography>
        </CardBody>
      </CardWrapper>
    </div>
  );
}
