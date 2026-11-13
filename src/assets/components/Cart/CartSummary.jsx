import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function CartSummary({ total }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ p: 2 }}>
        Order Summary
      </Typography>

      <Divider />
      <Box></Box>

      <Button variant="contained" fullWidth>
        checkout
      </Button>
    </Paper>
  );
}