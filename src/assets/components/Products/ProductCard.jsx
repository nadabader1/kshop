import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const rating = Number(product.rating ?? product.Rating ?? 0);

  return (
    <Card>
      <CardActionArea component={Link} to={`/products/${product.id}`}>
        {product.image && (
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{ height: 200, objectFit: "contain" }}
          />
        )}

        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Rating value={rating} precision={0.5} readOnly />
          <Typography color="primary">${product.price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}