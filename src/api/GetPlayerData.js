const fs = require('fs');
const _ = require('lodash');
const hotsAPI = require('./HotSAPI');


const players = {
    // "Chaxtreme#2576",
    // "EaMo#2553",
    // "havocx42#2824",
    // "wevansly#2471",
    // "Okopolitan#2314",
    // "ufu#2259",
    "Chaxtreme": 7349829,
    "EaMo": 2560109,
    "havocx42": 7325363,
    "wevansly": 2875722,
    "Okopolitan": 102373,
    "ufu": 6750654
};

async function getReplays(params) {
    return await hotsAPI.getReplays({ params });
}

function writeToPlayerFile(fileName, data) {
    fs.writeFile(`../generated/playerData/${fileName}.json`, data, (err) => {
        console.log(err);
    });
}

function groupByGameType(replays) {
    return _(replays)
            .orderBy('game_date')
            .groupBy('game_type')
            .value()
}

function groupByHero(replays, blizzID) {
    return _(replays)
            .orderBy('game_date')
            .groupBy((replay) => {
                const playerInstance = _.find(replay.players, (matchPlayer) => {
                    return matchPlayer.blizz_id === blizzID;
                });

                return playerInstance.hero;
            })
            .value()
}

function retrieveAndWritePlayerData() {

    Object.entries(players).forEach(async ([player, blizzID]) => {
        const replays = await getReplays({
            start_date: '2017-11-01',
            end_date: '2018-11-01',
            player,
            with_players: true
        });
        const filterdReplays = replays.filter((replay) => {
            return replay.players.some((matchPlayer) => matchPlayer.blizz_id === blizzID)
        });
        writeToPlayerFile(`gameType/${player}`, JSON.stringify(groupByGameType(filterdReplays)));
        writeToPlayerFile(`hero/${player}`, JSON.stringify(groupByHero(filterdReplays, blizzID)));
    });
}

retrieveAndWritePlayerData();