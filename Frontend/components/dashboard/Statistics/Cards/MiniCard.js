import React from "react";
import { loadCSS } from 'fg-loadcss';
import {Card, CardContent, Typography,Grid} from "@material-ui/core";
import Icon from '@material-ui/core/Icon';

const MiniCard =({label,data,icon,color})=>{

    React.useEffect(() => {
        //lazy load font awesome css
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);
    return(
        <Card style={{padding:"10px",minHeight:"130px"}}>
            <CardContent>
                <Grid container spacing={2} alignItems='center' justifyContent='center'>
                    <Grid item sm={3} justifyContent='center'>
                        <Typography align='center'>
                            <Icon  fontSize='large' className={icon} style={{color}}/>
                        </Typography>
                    </Grid>
                    <Grid item sm={9}>
                        <Typography align='center' color='inherit'  style={{fontWeight:'bold',fontSize:'20px'}}>{data}</Typography>
                        <Typography align='center' style={{fontSize:'14px'}} color='textSecondary' >{label}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
export  default  MiniCard;