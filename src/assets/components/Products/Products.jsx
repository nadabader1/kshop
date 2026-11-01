import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useProducts } from "../../hooks/UseProducts";
import ProductCard from "./ProductCard";

export default function Products() {
  const { data: products = [], isPending, isError } = useProducts();

  if (isPending) return <CircularProgress aria-label="Loading products" />;
  if (isError) return <Alert severity="error">Failed to load products.</Alert>;

  return (
    <Box component="section">
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        All Products
      </Typography>

      {products.length === 0 && <Typography>No products yet.</Typography>}

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}