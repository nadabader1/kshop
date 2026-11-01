import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useCategories } from '../../hooks/UseCategories';

export default function Categories() {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useCategories();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error.message || 'Failed to load categories'}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Categories
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            clickable
          />
        ))}
      </Box>
    </Box>
  );
}