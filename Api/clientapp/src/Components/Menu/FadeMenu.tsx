import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    fade: {
        color: '#FFFFFF'
    }
}));

export function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const classes = useStyles();
    
    return (
        <div>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} className={classes.fade}>
                Select language
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>.NET</MenuItem>
                <MenuItem onClick={handleClose}>SQL</MenuItem>
                <MenuItem onClick={handleClose}>JS</MenuItem>
            </Menu>
        </div>
    );
}