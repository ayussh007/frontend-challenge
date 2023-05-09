import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory} from "react-router-dom";
import "./Header.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({children}) => {

  const history = useHistory()

  return (
      <Box className="header">
        { <Box className="header-title" onClick={() => history.push("/", {from: "Header" })}>E-Commerce App
        </Box> }
        {children}
        <Stack direction="row" spacing={1}>
          <Button variant="text" style={{textDecoration: 'underline' , color: 'black', fontWeight: 'bold'}} className= "product-btn"  onClick={() => history.push("/", {from: "Header" })}>Products</Button>
          <Button style={{fontWeight: "bold"}} onClick={() => history.push("/cart", {from: "Header" })}>
            <ShoppingCartIcon style={{color: "black", backgroundColor: "lightgrey"}}/>
          </Button>
        </Stack>    
        </Box>
  )
};

export default Header;