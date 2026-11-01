import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useProduct from "../components/hooks/UseProduct.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isPending, isError } = useProduct(id);

  if (isPending) {
    return <CircularProgress aria-label="Loading product" />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load product.</Alert>;
  }

  if (!product) {
    return <Alert severity="info">Product not found.</Alert>;
  }

  return (
    <Box component="main" sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Link to="/products">Back to products</Link>

      <Typography component="h1" variant="h4" sx={{ my: 2 }}>
        {product.name}
      </Typography>

      {product.image && (
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{ display: "block", width: "100%", maxWidth: 360, mb: 2 }}
        />
      )}

      <Typography>{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>
    </Box>
  );
}