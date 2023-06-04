import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { chakra } from "@chakra-ui/system";
import { Box } from "@chakra-ui/react";

const MainLayout = ({ children, props }) => {
  return (
    <>
      <Header />
      <chakra.main minH={"calc(100vh - 80px)"}>
        <Box p={"35px"} {...props}>
          {children}
        </Box>
      </chakra.main>
      <Footer />
    </>
  );
};

export default MainLayout;
