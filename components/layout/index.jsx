import React from "react";
import PageHeader from "./pageheader";
import ScrollArrow from "./ScrollTop";

const Layout = ({ children }) => {
  return (
    <>
      <PageHeader />
      {children}
      <ScrollArrow/>
    </>
  );
};

export default Layout;
