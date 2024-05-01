import React from "react";
import axios from "axios";

let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

async function getRequest(endPoint) {
  let response = await axios
    .get(`${serverUrl}${endPoint}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
}

async function postRequest(endPoint, payload) {
  let response = await axios
    .post(`${serverUrl}${endPoint}`, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return response;
}

export { getRequest, postRequest };
