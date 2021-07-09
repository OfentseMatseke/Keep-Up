import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import Link from '../src/Link';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles(theme=>({
      menuButton:{
        fontFamily:'Roboto',
        fontSize:'12px',
        fontWeight:'700',
        display:'block',
        textAlign:'center',

      },

      menuI:{
        width: '100%',
        fontFamily:'Roboto',
        fontSize:'12px',
        fontWeight:'700',
        height:'100%',

      },
    }));
    const classes = useStyles();
  return (
    
    <div>
      <Button className = {classes.menuI} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon/>
      </Button>
      <Menu id="simple-menu" style={{textAlign:"-webkit-center"}}anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <Link href="index"><Button className={classes.menuButton}>Home</Button></Link>
        <Link href="about-us"><Button className={classes.menuButton}>About Us</Button></Link>
        <Link href="what-we-do"><Button className={classes.menuButton}>What We Do</Button></Link>
        <Link href="/about-us#who-we-are"><Button className={classes.menuButton}>Who We Are</Button></Link>
        <Link href="why-donate"><Button className={classes.menuButton}>Why Donate</Button></Link>
        <Link href="top-contributors"><Button className={classes.menuButton}>Top Contributors</Button></Link>
        <Link href="partners"><Button className={classes.menuButton}>Partners</Button></Link>
        <Link href= "events"><Button className={classes.menuButton}>Events</Button></Link>
        <Link href="media-pack"><Button className={classes.menuButton}>Media Pack</Button></Link>
        <Link href="/index#footer"><Button className={classes.menuButton}>Contact Us</Button></Link>
      </Menu>
    </div>
  );
}