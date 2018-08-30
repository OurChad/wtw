import React, { Component } from 'react';
import { withAppContext } from '../../context/withAppContext';
import { withStyles } from '@material-ui/core/styles';
import HeroPortrait from '../HeroPortrait';
import Grid from '@material-ui/core/Grid';

const styles = {
    teamCompContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    heroPortrait: {
        textAlign: 'center'
    }
};

class TeamComp extends Component {

    renderHeroPortraits = () => {
        const {
            classes, appContext: { heroes }, teamComp, teamPlayers 
        } = this.props;

        return teamComp.map(heroID => {
            const hero = heroes.find(aHero => aHero.name === heroID);
            const player = teamPlayers.find(aPlayer => aPlayer.hero === hero.name) || {};
            return (
                <Grid item xs={4} sm={3} md={2} key={hero.name} className={classes.heroPortrait}>
                    <div><HeroPortrait hero={hero} hideLink /></div>
                    <span >{player.playerName}</span>
                </Grid>
            );
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.teamCompContainer}>
                {this.renderHeroPortraits()}
            </div>
        );
    }
}

export default withStyles(styles)(withAppContext(TeamComp));
