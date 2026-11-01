import { Card, CardContent, Typography } from "@mui/material";

export default function CategoryItem({ category }) {
  return (
    <Card>
      <CardContent sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6">{category.name}</Typography>
      </CardContent>
    </Card>
  );
}