import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Header from './Header';


export default function HomeScreen() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
    <Header children /> <hr />
    <h2> Please select a category</h2>
    <Grid container spacing={2}>
      {categories.map(category => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category}>
          <Card style={{paddingTop: "40px"}}>
            <CardContent>
              <Typography style={{fontWeight: "700"}} variant="h5" component="h2">{category}</Typography>
              <Button component={Link} to={`/products/${category}`} variant="contained" color="primary">View products</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}