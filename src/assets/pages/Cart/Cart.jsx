import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router";

import useCart from "../../hooks/useCart.jsx";
import { useAuthStore } from "../../store/authStore";
import CartItem from "./CartItem.jsx";
import CartSummary from "./CartSummary.jsx";

export default function Cart() {
  const token = useAuthStore((state) => state.token);
  const { data, isPending, isError } = useCart();

  if (!token) {
    return (
      <Box>
        <Typography>Please login to view your cart</Typography>
        <Button component={Link} to="/login">
          Login
        </Button>
      </Box>
    );
  }

  if (isPending) {
    return <CircularProgress aria-label="Loading cart" />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load your cart.</Alert>;
  }

  if (!data?.items?.length) {
    return <Typography>Your cart is empty.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
        gap: 4,
      }}
    >
      <Box>
        {data.items.map((item) => (
          <CartItem key={item.id ?? item.productId} item={item} />
        ))}
      </Box>

      <Box>
        <CartSummary />
      </Box>
    </Box>
  );
}