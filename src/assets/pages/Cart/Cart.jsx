import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import useCart from "../../components/hooks/useCart.jsx";
import CartItem from "./CartItem.jsx";
import CartSummary from "../../components/Cart/CartSummary.jsx";

export default function Cart() {
  const token = localStorage.getItem("token");

  const { data, isPending, isError } = useCart();

  if (!token) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography sx={{ mb: 2 }}>
          Please login to view your cart
        </Typography>

        <Button component={Link} to="/login" variant="contained">
          Login
        </Button>
      </Box>
    );
  }

  if (isPending) {
    return <CircularProgress aria-label="Loading cart" />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load your cart.
      </Alert>
    );
  }

  if (!data?.items?.length) {
    return (
      <Typography sx={{ p: 3 }}>
        Your cart is empty.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "2fr 1fr",
        },
        gap: 4,
        p: 3,
      }}
    >
      <Box>
        {data.items.map((item) => (
          <CartItem
            key={item.id ?? item.productId}
            item={item}
          />
        ))}
      </Box>

      <Box>
        <CartSummary />
      </Box>
    </Box>
  );
}