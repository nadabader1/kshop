
import { Box, Button, Typography, IconButton } from "@mui/material";
import useUpdateCartItem from "../../components/hooks/useUpdateCartItem.jsx";
import useRemoveItemCart from "../../components/hooks/useRemoveItemCart.jsx";

export default function CartItem({ item }) {
  const { mutate: updateItem, isPending: updating } = useUpdateCartItem();
  const { mutate: removeItem, isPending: removing } = useRemoveItemCart();

  const product = item.product ?? item.Product ?? item;
  const productId = item.productId ?? item.ProductId ?? product.id;
  const quantity = item.count ?? item.Count ?? item.quantity ?? 1;

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;

    updateItem({
      productId,
      count: newQuantity,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        mb: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">
          {product.name ?? product.Name ?? "Product"}
        </Typography>

        <Typography color="text.secondary">
          ${product.price ?? product.Price ?? 0}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            disabled={updating || quantity <= 1}
            onClick={() => updateQuantity(quantity - 1)}
          >
            -
          </Button>

          <Typography>{quantity}</Typography>

          <Button
            variant="outlined"
            disabled={updating}
            onClick={() => updateQuantity(quantity + 1)}
          >
            +
          </Button>
        </Box>
      </Box>

      <IconButton
        color="error"
        disabled={removing}
        onClick={() => removeItem(item.id ?? item.Id ?? productId)}
      >
        <span style={{ fontSize: "22px" }}>🗑️</span>
      </IconButton>
    </Box>
  );
}
