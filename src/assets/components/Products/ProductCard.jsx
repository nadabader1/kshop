import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/products/${product.id}`}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
        />

        <CardContent>
          <Typography>{product.name}</Typography>

          <Rating value={product.Rating} readOnly />

          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}