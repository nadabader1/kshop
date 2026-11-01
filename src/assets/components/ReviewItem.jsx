import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import React from "react";

export default function ReviewItem({ review }) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box>
        <Typography>{review.userName}</Typography>
        <Typography>
          {new Date(review.createdAt).toLocaleDateString()}
        </Typography>
      </Box>

      <Rating value={review.rating} readOnly />
      <Typography>{review.comment}</Typography>
    </Paper>
  );
}