import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { CardWrapper } from "./styles";

import api from "../../services/api";

export default function Retrieve() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [recordData, setRecordData] = useState({});

  const fetchScreenData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/qr-code/${slug}`);
      setRecordData(data);
    } catch (error) {
      if (error.response.status === 404) {
        setNotFound(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScreenData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex justify-center h-screen">
      <CardWrapper className="w-96">
        {loading && !recordData?.name ? (
          <div className="flex justify-center items-center h-64">
            <svg
              className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          recordData?.github && (
            <>
              <CardHeader floated={false} className="h-80">
                <img
                  src={recordData.github.avatar_url}
                  alt="Github Profile"
                  className="w-full cursor-pointer"
                />
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h5" className="mb-2">
                  {recordData.github.name}
                </Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>

                  {recordData.github.bio}
                </Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>

                  {new Date(recordData.github.created_at).toLocaleDateString()}
                </Typography>
              </CardBody>
              <CardFooter
                divider
                className="flex items-center justify-between py-3"
              >
                <Typography variant="small" color="gray" className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
                  {recordData.github.company}
                </Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {recordData.github.location}
                </Typography>
              </CardFooter>
            </>
          )
        )}

        {notFound && <Navigate to="/404" />}
      </CardWrapper>
    </div>
  );
}
