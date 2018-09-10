import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAppContext } from '../../context/withAppContext';
import versusImg from '../../resources/images/vs.png';
import styled from 'styled-components';
import TeamComp from '../TeamComp';
import Typography from '../common/Typography';

class GameDetails extends Component {
    
    static propTypes = {
        teamCompID: PropTypes.string.isRequired,
    }    

    constructor(props) {
        super(props);
    
        const { teamCompID, appContext: { teamComps } } = props;
        const games = teamComps.get(teamCompID);
        const heroes = games[0].teamPlayers.map(player => player.hero);

        this.state = {
            games,
            heroes
        };
    }
    

    renderTeamComps = (game) => {
        return (
            <TeamsDetailWrapper key={game.gameID}>
                <TeamComp teamComp={game.winningTeamComp} teamPlayers={ game.isWin ? game.teamPlayers : [] } />
                <VersusImg src={versusImg} alt='versus' />
                <TeamComp teamComp={game.losingTeamComp} teamPlayers={ !game.isWin ? game.teamPlayers : [] } />
            </TeamsDetailWrapper>
        );
    }

    renderGameDetails = () => {
        const { games } = this.state;
        return games.map((game, i) => {
            const gameTypeLabel = `Game Type: ${game.gameType}`;
            const mapNameLabel = `Map: ${game.mapName.name}`;
            const winLabel = game.isWin ? 'WTW Win: Yeah boii' : 'WTW Win: Technically... no';
            const changeBackground = i % 2 === 0;
            return (
                <GameDetailsRow key={game.gameID} background={changeBackground}>
                    <GameDetailsWrapper>
                        <Typography>{gameTypeLabel}</Typography>
                        <Typography>{mapNameLabel}</Typography>
                        <Typography>{winLabel}</Typography>
                    </GameDetailsWrapper>
                    {this.renderTeamComps(game)}
                </GameDetailsRow>
            );
        });
    }

    render() {
        const { heroes } = this.state;
        return (
            <div>
                <PageTitle>Team Comp</PageTitle>
                <TeamComp teamComp={heroes} />
                <PageTitle>Games</PageTitle>
                {this.renderGameDetails()}
            </div>
        );
    }
}

export default withAppContext(GameDetails);

const PageTitle = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 1.4rem;
    text-align: center;
    color: #fff;
`;

const GameDetailsRow = styled.div`
    background-color: ${props => (props.background ? 'rgba(255, 255, 255, 0.1)' : '')};
`;

const GameDetailsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1em;
    color: #fff;
`;

const TeamsDetailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 1em;
`;

const VersusImg = styled.img`
    width: 90px;
    height: 90px;
    margin: 1em;
`;