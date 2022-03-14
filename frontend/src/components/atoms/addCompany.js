import React from 'react';
import AddIcon from "@mui/icons-material/Add";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function AddCompany({ isNew, change}) {
    return (
        <Box sx={{display: "flex",position: "absolute", zIndex: "100",left:"2%",top: "5%"}}>
            <Button onClick={() => change('new', !isNew)} variant="contained" startIcon={<AddIcon />} sx={{fontWeight: "600",backgroundColor: '#db2828', color: "white"}}>
                Add Company
            </Button>
        </Box>
    );
}

export default AddCompany;