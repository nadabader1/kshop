
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Rating,
  Typography,
} from "@mui/material";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Slide, toast } from "react-toastify";

import useProduct from "../components/hooks/UseProduct.jsx";
import ReviewItem from "../components/ReviewItem";
import useAddToCart from "../components/hooks/useAddToCart.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const {
    data: product,
    isPending,
    isError,
  } = useProduct(id);

  const {
    mutate: addToCart,
    isPending: addToCartPending,
  } = useAddToCart();

  if (isPending) {
    return <CircularProgress aria-label="Loading product" />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load product.</Alert>;
  }

  if (!product) {
    return <Alert severity="info">Product not found.</Alert>;
  }

  const inStock = product.quantity > 0;

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    addToCart(product.id, {
      onSuccess: () => {
        toast.success("Product added to cart successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Slide,
        });
      },
      onError: () => {
        toast.error("Failed to add product to cart.");
      },
    });
  };

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
          sx={{
            display: "block",
            width: "100%",
            maxWidth: 360,
            mb: 2,
            objectFit: "contain",
          }}
        />
      )}

      <Rating value={product.rate ?? 0} precision={0.5} readOnly />

      <Typography variant="h4" color="primary" sx={{ my: 1 }}>
        ${product.price}
      </Typography>

      <Chip
        label={inStock ? "In Stock" : "Out Of Stock"}
        color={inStock ? "success" : "error"}
      />

      <Typography sx={{ my: 2 }}>
        {product.description}
      </Typography>

      <Button
        variant="contained"
        onClick={handleAddToCart}
        disabled={!inStock || addToCartPending}
      >
        {addToCartPending ? "Adding..." : "Add To Cart"}
      </Button>

      <Divider sx={{ my: 3, borderBottomWidth: 3 }} />

      {product.reviews?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </Box>
  );
}
