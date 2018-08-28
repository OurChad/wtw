import React from 'react';
import { Link, navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        '& a': {
            color: '#fff',
            textShadow: 'none',
            textDecoration: 'none',
        }
    },
    appBar: {
        backgroundColor: 'var(--primary-theme-color)'        
        // marginLeft: drawerWidth,
        // [theme.breakpoints.up('md')]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        // },
    },
    toolbar: theme.mixins.toolbar,
    sideBarTitle: {
        padding: '16px 16px 0px 16px'
    },
    menuTitle: {
        padding: '16px 16px 8px 16px'
    }
});

class WTWAppBar extends React.PureComponent {

    state = {
        menuOpen: false
    };

    toggleMenu = (open) => () => {
        this.setState({
            menuOpen: open,
        });
    };

    renderPlayerMenuItem = () => {
        const { players } = this.props;
        const navigateToPlayer = (player) => () => {
            this.toggleMenu(false)();
            navigate(`/player/${player}`);
        };

        return players.map(player => {
            return (<MenuItem key={player} tabIndex={0} onClick={navigateToPlayer(player)}>{player}</MenuItem>);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.toggleMenu(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            <Link to='/'>WTW</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.menuOpen}
                    onClose={this.toggleMenu(false)}
                    onOpen={this.toggleMenu(true)}
                >
                    <div>
                        <div className={classes.toolbar}>
                            <Typography variant="title" align='center' color="inherit" className={classes.sideBarTitle}>
                                Waffler Tier
                            </Typography>
                        </div>
                        <Divider />
                        <Typography variant="title" align='center' color="inherit" className={classes.menuTitle}>
                            Players
                        </Typography>
                        {this.renderPlayerMenuItem()}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

WTWAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WTWAppBar);