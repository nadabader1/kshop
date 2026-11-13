import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import useRemoveItemCart from "../../hooks/useRemoveItemCart";

export default function CartItem({ item }) {
  const { mutate: updateCartItem, isPending } = useUpdateCartItem();
  const { mutateAsync: removeCartItem, isPending: isRemovePending } =
    useRemoveItemCart();

  const isBusy = isPending || isRemovePending;
  const count = item.count ?? item.quantity;
  const totalPrice = item.totalPrice ?? (item.price * count).toFixed(2);

  const handleIncrease = () => {
    updateCartItem({
      productId: item.productId,
      count: count + 1,
    });
  };

  const handleDecrease = () => {
    updateCartItem({
      productId: item.productId,
      count: count - 1,
    });
  };

  const handleRemove = async () => {
    try {
      await removeCartItem(item.productId);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item from cart");
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography>{item.productName}</Typography>
        <Typography>${item.price} each</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: 1,
          borderColor: "grey.400",
          borderRadius: 1,
          p: 1,
        }}
      >
        <IconButton
          aria-label="Decrease quantity"
          onClick={handleDecrease}
          disabled={isBusy || count <= 1}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        <Typography>{count}</Typography>

        <IconButton
          aria-label="Increase quantity"
          onClick={handleIncrease}
          disabled={isBusy}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography>Total: ${totalPrice}</Typography>

      <IconButton
        aria-label={`Remove ${item.productName} from cart`}
        color="error"
        onClick={handleRemove}
        disabled={isBusy}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}