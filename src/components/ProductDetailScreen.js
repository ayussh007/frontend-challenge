import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Rating, Badge,
    Typography,
} from "@mui/material";
import { ThumbUpAlt as ThumbUpAltIcon } from '@mui/icons-material';
import Header from './Header';
import "./ProductCard.css";
import "./SearchBar.css";

export default function ProductDetailScreen({ match, handleAddToCart, totalQuantity }) {
    const [product, setProduct] = useState(null);

    console.log("handleAddToCart prop:", handleAddToCart);
  
    useEffect(() => {
        const productId = match.params.productId;
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                console.log(response.data);
                setProduct(response.data)
            })
            .catch(error => console.log(error));
    }, [match.params.productId]);

    if (!product) {
        return <div>Loading...</div>
    }

    const handleAddToCartClick = (product) => {
        console.log("Adding product to cart:", product);
        handleAddToCart(product);
    }

    return (
        <div>
            <div style={{ display: 'flex', padding: '10px', justifyContent: "center" }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt={product.title}
                        image={product.image}
                    />
                    <CardContent>
                        <Typography style={{fontWeight: "600"}} gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                        <Typography sx={{ fontSize: 22, fontWeight: "600" }} color="text.secondary" gutterBottom>
                            $ {product.price}
                        </Typography>
                        <CardActions>
                            <Button
                                style={{backgroundColor: "rgb(98, 98, 98)", color: "#fff", border: "1px solid black"}} 
                                className="card-btn"
                                type="button"
                                role="button"
                                aria-label='add to cart'
                                fullWidth
                                variant="contained"
                                onClick={() => handleAddToCartClick(product)}
                            >
                                Add to cart
                            </Button>
                        </CardActions>
                        <h3 style={{fontWeight: "600"}}> User Reviews: </h3>
                        <Rating name="product-rating" value={product.rating.rate} precision={0.5} readOnly />
                        <Badge badgeContent={product.rating.count} color="primary">
                            <ThumbUpAltIcon />
                        </Badge>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

