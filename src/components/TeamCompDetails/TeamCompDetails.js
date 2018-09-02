import React, { Component } from 'react';
import _ from 'lodash';
import { withAppContext } from '../../context/withAppContext';
import TeamComp from '../TeamComp';
import { 
    Typography, 
    ExpansionPanel, 
    ExpansionPanelSummary, 
    ExpansionPanelDetails 
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    pageTitle: {
        marginTop: '16px',
        fontSize: '1.4rem',
        textAlign: 'center',
        color: '#fff',
    },
    teamComps: {
        marginTop: '16px',
        padding: '8px',
        // fontSize: '1.4rem',
        // textAlign: 'center',
        // color: '#fff',
    },
    teamCompListContainer: {
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    teamCompStats: {
        color: 'var(--primary-dark-color)',
    },
    card: {
        width: 360,
        margin: '8px'
    },
};

class TeamCompDetails extends Component {

    constructor(props) {
        super(props);

        const allTeamComps = this.generateTeamComps();
        const filtering = { 
            compSizeOrdering: 'asc' 
        };
        this.state = {
            allTeamComps,
            filtering
        };
    }

    filterAndSortTeamComps = (teamComps, filtering) => {
        const sortedTeams = _.orderBy(teamComps, comp => comp.heroes.length, filtering.compSizeOrdering);

        return sortedTeams;
    }

    generateTeamComps = () => {
        const { appContext: { teamComps } } = this.props;
        const allTeamComps = [];
        
        teamComps.forEach((teamCompValues, key) => {
            const teamCompDetails = {
                key,
                heroPortraits: <div>No Heroes</div>,
                heroes: [],
                players: [],
                gameTypes: [],
                numberOfGames: 0,
                numberOfWins: 0
            };
            
            teamCompDetails.heroes = teamCompValues[0].teamPlayers.map(player => player.hero);
            teamCompDetails.numberOfGames = teamCompValues.length;
            teamCompDetails.numberOfWins = teamCompValues.filter(teamCompGame => teamCompGame.isWin).length;
            teamCompDetails.gameTypes = teamCompValues.reduce((gameTypesAcc, teamCompGame) => {
                if (gameTypesAcc.includes(teamCompGame.gameType)) {
                    return gameTypesAcc;
                }

                return gameTypesAcc.concat(teamCompGame.gameType);
            }, []);
            teamCompDetails.players = teamCompValues.reduce((playersAcc, teamCompGame) => {
                teamCompGame.teamPlayers.forEach(player => {
                    if (!playersAcc.includes(player.playerName)) {
                        return playersAcc.push(player.playerName);
                    }
                });

                return playersAcc;
            }, []);

            // const teamCompHeroes = heroes.filter(hero => teamCompDetails.heroPortraits.includes(hero.attributeId));
            const teamCompPortraits = <TeamComp teamComp={teamCompDetails.heroes} />;

            // const gamesTeamComps = teamCompValues.map(game => {
            //     return (
            //         <div key={game.gameID}>
            //             <Typography variant="title">Winning Team</Typography>
            //             <TeamComp teamComp={game.winningTeamComp} teamPlayers={game.teamPlayers} />
            //             <Typography variant="title">Losing Team</Typography>
            //             <TeamComp teamComp={game.losingTeamComp} teamPlayers={game.teamPlayers} />
            //         </div>
            //     );
            // });

            const teamCompHeroesElement = (
                <div key={key}>
                    {teamCompPortraits}
                </div>
            );

            teamCompDetails.heroPortraits = teamCompHeroesElement;
            allTeamComps.push(teamCompDetails);

            // if (teamCompValues[0].teamPlayers.length === 3) {
            //     try {
            //         const teamCompsDiv = (
            //             <div key={key}>
            //                 <Typography variant="title">Winning Team</Typography>
            //                 <TeamComp teamComp={teamComp[0].winningTeamComp} teamPlayers={teamComp[0].teamPlayers} />
            //                 <Typography variant="title">Losing Team</Typography>
            //                 <TeamComp teamComp={teamComp[0].losingTeamComp} teamPlayers={teamComp[0].teamPlayers} />
            //             </div>
            //         );
    
            //         teamCompsElements.push(teamCompsDiv);
            //     } catch (error) {
            //         console.log('probably lucio');
            //     }
            // }
        });
    
        return allTeamComps;
    }

    // renderTeamCompGameDetails = (teamComp) => {
    //     const { classes } = this.props;
    //     return (
    //         <ExpansionPanel>
    //             <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
    //                 <Typography className={classes.teamCompStats}>Comp Details</Typography>
    //             </ExpansionPanelSummary>
    //             <ExpansionPanelDetails>
    //                 <div>
    //                     <Typography className={classes.teamCompStats}>Number of Games: {teamComp.numberOfGames}</Typography>
    //                     <Typography className={classes.teamCompStats}>Number of Wins: {teamComp.numberOfWins}</Typography>
    //                     <Typography className={classes.teamCompStats}>Game Type(s): {teamComp.gameTypes.map(gameType => <React.Fragment key={gameType}>{gameType.concat(' ')}</React.Fragment>)}</Typography>
    //                 </div>
    //             </ExpansionPanelDetails>
    //         </ExpansionPanel>
    //     );
    // }

    renderTeamComps = () => {
        const { classes } = this.props;
        const { allTeamComps, filtering } = this.state;
        const sortedTeamComps = this.filterAndSortTeamComps(allTeamComps, filtering);

        const teamCompCards = sortedTeamComps.map(teamComp => {
            return (
                <Card key={teamComp.key} className={classes.card}>
                    <CardContent>
                        <div className={classes.teamComps}>
                            {teamComp.heroPortraits}     
                            <div>
                                <Typography className={classes.teamCompStats}>Number of Games: {teamComp.numberOfGames}</Typography>
                                <Typography className={classes.teamCompStats}>Number of Wins: {teamComp.numberOfWins}</Typography>
                                <Typography className={classes.teamCompStats}>
                                    Game Type(s): {
                                        teamComp.gameTypes.map(gameType => {
                                            if (gameType === teamComp.gameTypes[teamComp.gameTypes.length - 1]) {
                                                return <React.Fragment key={gameType}>{gameType}</React.Fragment>;
                                            }
                                            return <React.Fragment key={gameType}>{gameType.concat(' / ')}</React.Fragment>;
                                        })
                                    }
                                </Typography>
                                <Typography className={classes.teamCompStats}>
                                    Players: {
                                        teamComp.players.map(player => {
                                            if (player === teamComp.players[teamComp.players.length - 1]) {
                                                return <React.Fragment key={player}>{player}</React.Fragment>;
                                            }
                                            return <React.Fragment key={player}>{player.concat(' / ')}</React.Fragment>;
                                        })
                                    }
                                </Typography>
                            </div>           
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => {}}>Game Details</Button>
                    </CardActions>
                </Card>
            );
        });

        return (
            <div className={classes.teamCompListContainer}>
                {teamCompCards}
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography className={classes.pageTitle}>Team Comps</Typography>
                { this.renderTeamComps() }
            </div>
        );
    }
}

export default withStyles(styles)(withAppContext(TeamCompDetails));
