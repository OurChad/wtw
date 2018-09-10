import React from 'react';
import { Link, navigate } from '@reach/router';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';

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
    },
    menuButtonsWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    }
});

class WTWAppBar extends React.PureComponent {

    state = {
        menuOpen: false
    };

    toggleMenu = (open) => () => {
        this.setState({
            menuOpen: open,
            anchorEl: null,
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

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Hidden mdUp>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.toggleMenu(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Typography variant="title" color="inherit">
                            <Link to='/'>WTW</Link>
                        </Typography>
                        <div className={classes.menuButtonsWrapper}>
                            <Hidden smDown>
                                <Button
                                    onClick={() => {
                                        this.toggleMenu(false)();
                                        navigate('/teamcomps');
                                    }}
                                    color="inherit"
                                >
                            Team Comps
                                </Button>
                                <Button
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                            Players
                                </Button>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    {this.renderPlayerMenuItem()}
                                </Menu>
                            </Hidden>
                        </div>
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
                        <Divider />
                        <MenuItem tabIndex={0} onClick={() => {
                            this.toggleMenu(false)();
                            navigate('/teamcomps');
                        }}>Team Comps</MenuItem>
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