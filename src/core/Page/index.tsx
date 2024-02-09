import { Helmet } from "react-helmet-async";
import React from "react";
import { Box } from "@mui/material";

interface PageInterFace {
    children?: React.ReactNode;
    title: string;
    description?:string;
  }
const Page = ({ title, description, children }: PageInterFace) => {
  return (
    <>
      {/* Its is use in head tag */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Box>{children}</Box>
    </>
  );
};
export default Page;

//Title :- 50-60 characters of your title -> Include a reasonable number of keywords
//Description :- 150-160 characters of your Description -> Include a reasonable number of keywords
