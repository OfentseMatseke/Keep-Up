import React from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import Link from "../src/Link";
//import Link from "next/Link";
import Paper from "@material-ui/core/Paper";


function error404() {
  return (
  	/*Removing this empty <> gives an error: "Adjacent JSX Elements 		
  	*/
	<>
		<NextHead>
        	<title>Page Not Found</title>
      	</NextHead>
      	      	
      	<div className="fullpage">
        	<div className="content">
          		<div className="banner">
        			
        			//Add Banner, Format Copied from index.js  		
            		<Grid container className={"headerGrid"}>
              			<Grid item xs={2} style={{}}>              			
              			</Grid>
              			<Grid item xs={8} style={{ width: "100%" }}>
                		<img src="/static/Layout/KEEP UP.png" />
              			</Grid>
            		</Grid>          		
          		</div >

          		<div className="Warning Sign">
            		<Grid container className={"WarningGrid"}>
            		
              			<Grid item style={{ textAlign: "center", width: "100%" }}>
                		<img src="../static/warning481.png" height = {150} width = {150}/>
				          <Typography
				            style={{textAlign: "center", fontSize:"40px", fontWeight:"1000" }}
				          >
				            {"Error: 404"}
				          </Typography>                		
              			</Grid>
              			
            		</Grid>                       		
          		</div>
          		
          		<Paper 
                  style={{
                    width: "90%",
                    //marginTop: "10px",
                    //marginBottom: "50px",
                    borderRadius: "8px",                   
                    margin: "auto",
                    height: "100px",
                  }}>
				<div >
					<Grid container className={"errorMessageGrid"}>
						 <Grid item xs={2} >
						 </Grid>
							<Typography
				            	style={{textAlign: "center", fontSize:"21px", fontWeight:"500" }}>
				            	{"Oops! We can’t seem to find the page you are looking for. Not to worry, you can"}
				            </Typography>
							  
						
							<Link href="../">
								<Button
						    		style={{
						      			background: "black",
						      			color:"white",
						      			marginRight: "2px",
						      			marginLeft: "2px",
						      			marginTop:"3px",
//						      			marginBottom:"50px",
						      			height: "22px",
						      			padding: "5px 5px",
						    		}}
						  		>

									<Typography	
										style={{textAlign: "center",fontSize:"17px", marginTop:"5px"}}
								    	>
								    	{"Click Here"}
								    </Typography>
					    		
						  		</Button>
							</Link>
							
							<Typography
				            	style={{textAlign: "center", fontSize:"21px", fontWeight:"500" }}>
				            	{" to return to the homepage."}
				            </Typography>					  	
							
			 		</Grid>								
				</div>
				</Paper>			
			</div>	   
				<div className="pageFooter" id="footer">
					<Footer />
				</div>						          		      
		</div>					         
	</> 
		  	
  );
}

export default error404;
