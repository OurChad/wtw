import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import HeroPortrait from '../HeroPortrait';
import { withAppContext } from '../../context/withAppContext';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    heroList: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center'
    }
};
class HeroList extends Component {

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid container>
                    {
                        this.props.appContext.heroes.map(hero => {
                            return (
                                <Grid item xs={4} sm={3} md={2} key={hero.name} className={classes.heroList}>                                    
                                    <HeroPortrait hero={hero} />
                                </Grid>
                            );
                        })
                    }
                </Grid>                
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(withAppContext(HeroList));
