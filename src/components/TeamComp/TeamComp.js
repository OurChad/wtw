import React, { Component } from 'react';
import { withAppContext } from '../../context/withAppContext';
import { withStyles } from '@material-ui/core/styles';
import HeroPortrait from '../HeroPortrait';

const styles = {
    teamCompContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    heroPortrait: {
        textAlign: 'center',
        padding: '8px'
    }
};

class TeamComp extends Component {

    renderHeroPortraits = () => {
        const {
            classes, appContext: { heroes }, teamComp, teamPlayers 
        } = this.props;

        return teamComp.map(heroID => {
            const hero = heroes.find(aHero => aHero.attributeId === heroID);
            if (teamPlayers) {
                const player = teamPlayers.find(aPlayer => aPlayer.hero === hero.attributeId) || {};
                return (
                    <div key={hero.name} className={classes.heroPortrait}>
                        <div><HeroPortrait hero={hero} hideLink /></div>
                        <span >{player.playerName}</span>
                    </div>
                );
            }

            return (
                <div key={hero.name} className={classes.heroPortrait}>
                    <div><HeroPortrait hero={hero} hideLink /></div>
                </div>
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
