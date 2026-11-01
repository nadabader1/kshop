import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useCategories } from "../hooks/useCategories.jsx";
import CategoryItem from "./CategoryItem.jsx";

export default function Categories() {
  const { data: categories = [], isPending, isError } = useCategories();

  if (isPending) {
    return <CircularProgress aria-label="Loading categories" />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load categories.</Alert>;
  }

  return (
    <Box component="section" sx={{ my: 4 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Shop by category
      </Typography>

      {categories.length === 0 && (
        <Typography>No categories yet.</Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </Box>
    </Box>
  );
}