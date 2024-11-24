import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Image 1', imageUrl: 'https://images.pexels.com/photos/29469995/pexels-photo-29469995/free-photo-of-customer-enjoying-titled-books-outside-french-bookstore.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
  { id: 2, title: 'Image 2', imageUrl: 'https://images.pexels.com/photos/20109560/pexels-photo-20109560/free-photo-of-pancakes-with-honey-and-strawberries.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
  { id: 3, title: 'Image 3', imageUrl: 'https://images.pexels.com/photos/20183276/pexels-photo-20183276/free-photo-of-thicket-of-nerve-plant-leaves.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
  { id: 4, title: 'Image 4', imageUrl: 'https://images.pexels.com/photos/29366969/pexels-photo-29366969/free-photo-of-surfboards-on-ipanema-beach-in-rio-de-janeiro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 5, title: 'Image 5', imageUrl: 'https://images.pexels.com/photos/29415491/pexels-photo-29415491/free-photo-of-hot-air-balloons-over-lake-salda-at-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 6, title: 'Image 6', imageUrl: 'https://images.pexels.com/photos/28878784/pexels-photo-28878784/free-photo-of-majestic-mountain-landscape-at-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

const Gallery: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {galleryItems.map((item,i) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardMedia
              component="img"
              height="150"
              image={item.imageUrl}
              alt={item.title}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Gallery;