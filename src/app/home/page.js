"use client";
import React, { use, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { getRequest } from "../../connection/httpRequest";
import Loading from "@/components/loading";

import NavBar from "@/components/navBar";
import poImg from "../../assets/po.png";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Home() {
  let [loading, setLoading] = useState(false);

  let [modules, setModules] = useState();

  async function getModules() {
    setLoading(true);
    let endPoint = "/module/getAllModules";
    let result = await getRequest(endPoint);

    if (result) {
      setLoading(false);

      let mod = Object.values(result.data);

      setModules(mod);
    }
  }

  useEffect(() => {
    getModules();
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="container flex flex-col mx-auto mt-10 justify-center items-center gap-2 sm:justify-start sm:items-start sm:flex-row">
          {modules?.map((module, index) => {
            let path = module.route;
            return (
              <Link className="cardLink" key={index} href={`/${path}`}>
                <Card sx={{ width: 275, height: 175 }}>
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
          })}
        </div>
      )}
    </>
  );
}
