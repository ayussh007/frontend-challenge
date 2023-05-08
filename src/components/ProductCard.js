import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import {Grid} from "@mui/material";

const ProductCard = ({ handleAddToCart, filteredProducts}) => {
    
return (

<div className="main-header">
<div className="row">
  {filteredProducts.length ? (
    filteredProducts.map((product) => (
      <div className="card-in-row" key={product.id} style={{border: "2px solid black"}}>
        <Typography style={{fontWeight: 900, zIndex:1, padding: "10px"}} className="card-header">{product.name}</Typography>
        <CardMedia style={{width: "100%", zIndex: 2}} className="card-head" height="140" component="img" alt={product.name} image={product.imageURL}/> 
        <CardContent>
        <Typography style={{color: "darkslategrey", fontWeight: 900}} className="card-body">Rs. {product.price}</Typography>
        <Button style={{backgroundColor: "rgb(98, 98, 98)", color: "#fff", display: "block", border: "1px solid black"}} 
        className="card-btn" type="button" role="button" aria-label='add to cart'
        fullWidth variant="contained" onClick= {() => handleAddToCart(product)} >Add to cart</Button>
        </CardContent>
      </div>
    ))
  ) : (
    <h2 style={{ color: "darkgrey" }}>No Products Found</h2>
  )}
</div>
</div>
    );

  };
  
  export default ProductCard;
