import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

const index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next AirBnB</title>
      </Head>
      <Home />
    </>
  )
};

export default index;