import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";

const SuburbSelector = ({onSuburbChange})=>{
    //Todo load  Suburbs
    return (
        <FormControl >
            <InputLabel shrink htmlFor="age-native-label-placeholder">
               Suburbs
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                name='Suburbs'
                id="demo-simple-select" value='sandown'
                onChange={onSuburbChange}
            >
                <MenuItem value='sandown'>Sandown</MenuItem>
            </Select>
        </FormControl>
    )
}

export  default  SuburbSelector;