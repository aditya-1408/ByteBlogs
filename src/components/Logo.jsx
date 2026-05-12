import React from "react";

const Logo = ({
  width = "100px",
  src = "/favicon.svg",
  alt = "Logo",
  className = "",
}) => {
  return <img src={src} alt={alt} style={{ width }} className={className} />;
};

export default Logo;
