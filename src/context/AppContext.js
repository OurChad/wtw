import React from 'react';

export const AppContext = React.createContext({
    heroes: [],
    players: [],
    gameTypes: [],
    playerHeroData: {},
    playerGameData: {},
});

export const initAppContext = function () {
    const heroReqContext = require.context('../resources/hero/', true, /\.json$/);
    const heroes = heroReqContext.keys().map(hero => heroReqContext(hero));

    const playerReqContext = require.context('../generated/playerData/', true, /\.json$/);
    const players = playerReqContext.keys().reduce((playersAcc, playerDataPath) => {
        // split path to find player file name
        const splitPath = playerDataPath.split('/');
        const playerName = splitPath[splitPath.length - 1].split('.json')[0];

        if (playersAcc.includes(playerName) || playerName.includes('_')) {
            return playersAcc;
        }
            
        return playersAcc.concat(playerName);
    }, []);
        
    const playerGameData = getPlayersData(playerReqContext, players, 'gameType');
    const playerHeroData = getPlayersData(playerReqContext, players, 'hero');
    const teamComps = playerReqContext.keys()
        .filter(fileKey => fileKey.includes('team_comp'))
        .reduce((teamCompMap, playerDataPath) => {
            // Result is in the shape of [[[]]]
            const teamCompArray = playerReqContext(playerDataPath);
            teamCompArray.forEach(comp => {
                teamCompMap.set(comp[0], comp[1]);
            });
            return teamCompMap;
        }, new Map());

    return {
        heroes,
        players,
        playerGameData,
        playerHeroData,
        teamComps
    };
};

function getPlayersData(playerReqContext, players, dataType) {
    return players.reduce((playerDataAcc, player) => {
        const playData = playerReqContext.keys()
            .filter(playerKey => playerKey.includes(player) && playerKey.includes(dataType))
            .map(playerDataPath => playerReqContext(playerDataPath));

        playerDataAcc[player] = playData[0];
        return playerDataAcc;
    }, {});
}