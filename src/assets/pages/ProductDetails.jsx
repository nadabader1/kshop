import React from "react";
import { useParams } from "react-router";
import UseProduct from "../hooks/UseProduct";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isPending, isError } = UseProduct(id);

  if (isPending) return <CircularProgress />;

  if (isError) {
    return <Alert severity="error">Failed to load categories.</Alert>;
  }

  return <div>ProductDetails</div>;
}