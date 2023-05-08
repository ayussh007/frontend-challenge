import {Grid} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Link from '@mui/material/Link';
import Header from "./Header";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import "./Products.css";
import Filter from "./Filter";


const Products = ({cartItems, handleAddToCart, totalQuantity}) => {

    const [productData,setProductData]=useState([]);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [filters, setFilters] = useState({
      color: '',
      gender: '',
      price: '',
      type: ''
    });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

  const performAPICall = async () => {
    const url = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        console.log(res.data, "PERFORM API");
        setProductData(res.data);
        setFilteredProducts(res.data)
        return res.data;
      }
    } catch (error) {
      enqueueSnackbar(
        "Something went wrong. Check the backend console for more details", { variant: "warning" }
      );
    }
  };

  const onSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredProducts(productData)
      setNoProductsFound(false);
    } else {
      const searchedProducts = productData.filter((product) => {
        const { name, color, type } = product;
        const searchString = `${name} ${color} ${type}`;
        return searchString.toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (searchedProducts.length > 0) {
      setFilteredProducts(searchedProducts)
      setNoProductsFound(false);
    } else {
      setFilteredProducts([]);
      setNoProductsFound(true);
    }
    }
  };


  useEffect(()=>{
    const datafetching = async () => {
    const productdata = await performAPICall();
    };

    datafetching();
    },[]);


    const handleFilterChange = (name, value) => {
      const updatedFilters = { ...filters, [name]: value };
      console.log("Filters are: ", updatedFilters);
      setFilters(updatedFilters);
      console.log("filter updated after: ", updatedFilters)
    }

    useEffect(() => {
      console.log('Filtering products with filters:', filters);
      let newFilteredProducts = [...productData];
      console.log("New Filtered Products are: ", newFilteredProducts)
      
      console.log("Color filter value: ", filters.color);
      if (filters.color) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) =>
            product.color.toLowerCase() === filters.color.toLowerCase()
        );
        console.log("New Filtered Products after applying color filter: ", newFilteredProducts)
      }
      if (filters.gender) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.gender === filters.gender
        );
      }

      if (filters.price) {
        let minPrice, maxPrice;
        switch (filters.price) {
          case '0-250':
            minPrice = 0;
            maxPrice = 250;
            break;
          case '251-450':
            minPrice = 251;
            maxPrice = 450;
            break;
          case '451-600':
            minPrice = 451;
            maxPrice = 600;
            break;
          default:
            minPrice = 0;
            maxPrice = 0;
            break;
        }
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
      }

      if (filters.type) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.type === filters.type
        );
      }
      console.log('Filtered Porducts:', newFilteredProducts)
      setFilteredProducts(newFilteredProducts);
    }, [filters, productData]);

    useEffect(() => {
      console.log("items in cart are:", cartItems);
    }, [cartItems]);

    return (
      <div>
        <Header children cartItems={cartItems} totalQuantity={totalQuantity} />
     
        <Grid container>
          <Grid 
          xs={12} md={9} 
          item className="product-grid" bgcolor="white">

          {noProductsFound && (
            <>
          <p>No products found for the given search term.</p>
          <Link href="/">Go back to product main page</Link>

          </>
          )}
          
          <SearchBar onSearch={onSearch} sx={{ m: 4 }}
            className="search-desktop" size="small" fullWidth id="standard-basic" variant="standard" />
      
          <Grid container>

          <Grid item xs={3}>
          <Filter filters={filters} onFilterChange={(name,value) => handleFilterChange(name, value)} />
          </Grid>

          <Grid item xs={9} style={{marginTop: "1rem"}}>
            <ProductCard 
            filteredProducts={filteredProducts} handleAddToCart={handleAddToCart}
              />
          </Grid>
          </Grid>

         </Grid>
      </Grid>
      </div>
    );
  };
  
  export default Products;
