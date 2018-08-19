import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import HeroPortrait from '../HeroPortrait';
import { withAppContext } from '../../context/withAppContext';
import HeroTalentsList from '../HeroTalentsList/HeroTalentsList';

const styles = {
    heroPortrait: {
        marginTop: '20px',
        marginBottom: '20px',
    }
};

class HeroDetails extends Component {

    constructor(props) {
        super(props);
        const { match: {params}, appContext: { heroes } } = this.props;        
        const hero = heroes.find(aHero => aHero.name === params.heroName);

        this.state = {
            hero
        };
    }

    render() {
        const { classes } = this.props;
        const { hero } = this.state;
        return (
            <div>
                <div className={classes.heroPortrait}>
                    <HeroPortrait hero={hero} />
                </div>
                <HeroTalentsList talents={hero.talents} />
            </div>
        );
    }
}

export default withStyles(styles)(withAppContext(HeroDetails));