"use client";
import React, { use, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { getRequest } from "../../connection/httpRequest";
import Loading from "@/components/loading";
import NavBar from "@/components/navBar";

import { useForm } from "react-hook-form";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Home() {
  let [loading, setLoading] = useState(false);

  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="container flex flex-col mx-auto mt-10 justify-center items-center gap-2 sm:justify-start sm:items-start sm:flex-row"></div>
      )}
    </>
  );
}
