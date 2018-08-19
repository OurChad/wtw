import React, { Component } from 'react';
import { withAppContext } from '../../context/withAppContext';

class PlayerDetails extends Component {

    constructor(props) {
        super(props);

        const { match: { params }, appContext } = this.props;
        const gameData = appContext.playerGameData[params.player];
        const heroData = appContext.playerHeroData[params.player];

        this.state = {
            gameData,
            heroData
        };
    }
    render() {
        return (
            <div>
                {Object.keys(this.state.gameData).map(gameType => <div>{gameType}</div>)}
            </div>
        );
    }
}

export default withAppContext(PlayerDetails);
