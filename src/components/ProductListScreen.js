
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useSnackbar } from "notistack";
import axios from 'axios';
import {
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Header from './Header';
import "./ProductCard.css";
import ProductDetailScreen from './ProductDetailScreen';
import "./SearchBar.css";

export default function ProductListScreen({ match, handleAddToCart, totalQuantity }) {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const category = match.params.category;
    axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [match.params.category]);
  

  const handleAddToCartClick = (product) => {
    handleAddToCart(product);
  }   

  const handleSortByPriceClick = () => {
    setSortBy("price");
  }

  const handleSortByNameClick = () => {
    setSortBy("name");
  }

  const handleSortByRatingClick = () => {
    setSortBy("rating");
  }

  const searchTerms = searchInput.toLowerCase().split(" ");
const filteredProducts = products.filter((product) => {
  return searchTerms.every((term) => product.title.toLowerCase().includes(term));
});


  let sortedProducts;
  if (sortBy === "price") {
    sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "name") {
    sortedProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "rating") {
    sortedProducts = [...filteredProducts].sort((a, b) => b.rating.rate - a.rating.rate);
  } else {
    sortedProducts = filteredProducts;
  }

  return (
    <div>
      <Header children />
      <input type="text" placeholder="Search Products" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Button variant={sortBy === "price" ? "contained" : "outlined"} onClick={handleSortByPriceClick} style={{ marginRight: "10px" }}>Sort by Price</Button>
        <Button variant={sortBy === "name" ? "contained" : "outlined"} onClick={handleSortByNameClick} style={{ marginRight: "10px" }}>Sort by Name</Button>
        <Button variant={sortBy === "rating" ? "contained" : "outlined"} onClick={handleSortByRatingClick}>Sort by Rating</Button>
      </div>
      <Grid container spacing={2} style={{paddingTop: "50px"}}>
        {sortedProducts.map(product => (
          <div className="card-in-row" key={product.id} style={{border: "3px solid black", display: "flex", padding: "5px"}}>
            <Link to={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card sx={{ maxWidth: 345 }} style={{objectFit: "contain"}}>
                <CardMedia style={{width: "100%", zIndex: 2, height: '150px', objectFit: 'contain' }} className="card-head" component="img" alt={product.title} image={product.image}/> 
                <CardContent sx={{ paddingBottom: 0 }}>
                  <Typography style={{fontWeight: 900, fontSize: "12px", zIndex:1, padding: "5px"}} className="card-header" variant="h5" component="h2">{product.title}</Typography>
                  <Typography style={{color: "darkslategrey", fontWeight: 900}} className="card-body">Rs. {product.price}</Typography>
                  <CardActions sx={{ justifyContent: "center"}}>
                    <Button style={{backgroundColor: "rgb(98, 98, 98)", color: "#fff", border: "1px solid black"}} 
                      className="card-btn" type="button" role="button" aria-label='add to cart'
                      fullWidth variant="contained" onClick={() => handleAddToCartClick(product)} >Add to cart</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Link> 
          </div>
        ))}
      </Grid>
      <Switch>
        <Route path={`/products/:productId`} render={(props) => <ProductDetailScreen {...props} handleAddToCart={handleAddToCart}/>} />
      </Switch>
    </div>
  );
        }  
