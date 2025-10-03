import React from "react";

const RandomHeader = React.memo(({ title }) => {
  return <div>{title}</div>;
});

export default RandomHeader;
