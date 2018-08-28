import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './AppBar.css';

const styles = {
    colorDefault: {
        backgroundColor: 'var(--primary-theme-color)'
    }    
};

function SimpleAppBar(props) {
    const { classes } = props;
    return (
        <div className="AppBar">
            <AppBar position="static" color="default" classes={classes}>
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        <Link to='/'>WTW</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);