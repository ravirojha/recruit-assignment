import React, {useContext} from 'react';
import { useCookies} from "react-cookie";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";

import styled from "styled-components";
import {toast} from "react-toastify";
import {AuthContext} from "../../App";


function Logout(props) {
    const {user, setUser} = useContext(AuthContext);
    const [,  , removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.success("Logged out successfully");
        removeCookie("user", {path: '/'});
        setUser(null);
        navigate('/');
    }



    return (
        <StyledComponents>
            <Box sx={{flexGrow: 1, position: 'absolute', width: "100%", zIndex: "2", left: "80%",top: "5%"}}>
                        <Button color="inherit" className="link-style" onClick={handleLogout}>
                            Logout
                        </Button>
            </Box>
        </StyledComponents>
    );
}

export default Logout;

const StyledComponents = styled.div`
  .link-style {
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    margin-left: 15px;
    background-color: #db2828;
  }
  
  .link-style:hover {
  background-color: red;
  }
`;