import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CategoryItem({ category }) {
  return (
    <Card>
      <CardActionArea>
        <CardContent sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h5">
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}