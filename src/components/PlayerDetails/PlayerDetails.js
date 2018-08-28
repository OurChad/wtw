import React, { Component } from 'react';
import _ from 'lodash';
import { withAppContext } from '../../context/withAppContext';
import HeroPortrait from '../HeroPortrait';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
    playerName: {
        marginTop: '16px',
        fontSize: '1.4rem',
        textAlign: 'center',
        color: '#fff',
    },
    heroList: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    heroStats: {
        color: '#fff',
    }
};
class PlayerDetails extends Component {

    constructor(props) {
        super(props);

        const { player, appContext: { playerHeroData } } = this.props;
        const heroesData = playerHeroData[player];

        this.state = {
            heroesData
        };
    }

    componentDidUpdate(prevProps) {
        const { player, appContext: { playerHeroData }} = this.props;

        if (player !== prevProps.player) {
            const heroesData = playerHeroData[player];

            this.setState({ heroesData });
        }
    }

    renderHeroStats = () => {
        const { classes, appContext: { heroes } } = this.props;
        const { heroesData } = this.state;
        const heroIDs = Object.keys(heroesData);
        const playerHeroes = heroes.filter(hero => heroIDs.includes(hero.attributeId));
        const sortedPlayerHeroes = _.sortBy(playerHeroes, hero => hero.name);

        return sortedPlayerHeroes.map(hero => {
            const heroData = heroesData[hero.attributeId];

            return (
                <Grid key={hero.attributeId} item xs={6} sm={4} md={2} className={classes.heroList}>
                    <HeroPortrait hero={hero} withLink/>
                    <div>
                        <Typography className={classes.heroStats}>Number of Games: {heroData.numberOfGames}</Typography>
                        <Typography className={classes.heroStats}>Win Rate: {heroData.winPercentage}%</Typography>
                    </div>
                </Grid>
            );
        });
    }

    render() {
        const { classes, player } = this.props;
        return (
            <React.Fragment>
                <Typography className={classes.playerName}>{player}</Typography>
                <Grid container>            
                    {this.renderHeroStats()}
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(withAppContext(PlayerDetails));
