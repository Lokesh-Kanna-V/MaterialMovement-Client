"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { getRequest } from "../../connection/httpRequest";
import Loading from "@/components/loading";

import NavBar from "@/components/navBar";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Products() {
  let [loading, setLoading] = useState(false);

  let [modules, setModules] = useState();

  const [open, setOpen] = useState();
  const [scroll, setScroll] = useState("paper");
  const handleClose = () => {
    setOpen(false);
  };

  const fields = ["Product Name", "Category"];

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  //   async function geAllProducts() {
  //     setLoading(true);
  //     let endPoint = "/module/getAllModules";
  //     let result = await getRequest(endPoint);

  //     if (result) {
  //       setLoading(false);

  //       let mod = Object.values(result.data);

  //       setModules(mod);
  //     }
  //   }

  useEffect(() => {
    // getModules();
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="container flex flex-col mx-auto mt-10 justify-center items-center gap-2 sm:justify-start sm:items-start sm:flex-row">
          {/* {modules?.map((module, index) => {
            let path = module.route;
            return (
              <Link className="cardLink" key={index} href={`/${path}`}>
                <Card
                  sx={{ width: 275, height: 175, backgroundColor: "#5F8ED3" }}
                >
                  <CardContent>
                    <div className="cardIcon flex justify-start w-10">
                      <Image src={poImg} alt="" />
                    </div>
                    <Typography variant="h5" component="div">
                      {module.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })} */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen("paper")}
          >
            Add Product
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">
              Please Enter Product Details
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <Stack spacing={2}>
                {fields.map((field) => {
                  return (
                    <TextField
                      id={field}
                      label={field}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  );
                })}
                <Button variant="contained">Save</Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
