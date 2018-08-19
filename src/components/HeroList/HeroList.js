import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import HeroPortrait from '../HeroPortrait';
import { withAppContext } from '../../context/withAppContext';

class HeroList extends Component {

    render() {
        
        return (
            <React.Fragment>
                <Grid container>
                    {
                        this.props.appContext.heroes.map(hero => {
                            return (
                                <Grid item xs={4} sm={1} key={hero.name}>
                                    <Link to={`/hero/${hero.name}`} hero={hero} >
                                        <HeroPortrait hero={hero} />
                                    </Link>
                                </Grid>
                            );
                        })
                    }
                </Grid>                
            </React.Fragment>
        );
    }
}

export default withAppContext(HeroList);
