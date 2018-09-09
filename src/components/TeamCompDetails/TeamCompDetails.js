import React, { PureComponent } from 'react';
import { withAppContext } from '../../context/withAppContext';
import {Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    teamComp: {
        marginTop: '16px',
        padding: '8px',
        // fontSize: '1.4rem',
        // textAlign: 'center',
        // color: '#fff',
    },
    teamCompStats: {
        color: 'var(--primary-dark-color)',
    },
    card: {
        width: 360,
        margin: '8px'
    },
};

class TeamCompDetails extends PureComponent {

    renderTeamComp = (teamComp) => {
        const { classes } = this.props;
        return (
            <Card key={teamComp.key} className={classes.card}>
                <CardContent>
                    <div className={classes.teamComp}>
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
    }

    render() {
        const { teamComp } = this.props;
        return this.renderTeamComp(teamComp);
    }
}

export default withStyles(styles)(withAppContext(TeamCompDetails));
