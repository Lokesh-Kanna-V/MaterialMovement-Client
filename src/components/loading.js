import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <CircularProgress />
    </div>
  );
}
