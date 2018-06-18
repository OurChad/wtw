const fs = require('fs');
const _ = require('lodash');
const hotsAPI = require('../api');

const generatedDir = `${__dirname}/../generated`;


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
    console.log(`generatePlayerData::getReplays`);
    return await hotsAPI.getReplays({ params });
}

function writeToPlayerFile(dirName, fileName, data) {
    console.log(`generatePlayerData::writeToPlayerFile - dirName: ${dirName} fileName: ${fileName}`);
    const playerDataDir = `${generatedDir}/playerData`;
    if (!fs.existsSync(`${playerDataDir}`)) {
        fs.mkdirSync(playerDataDir);
    }
    const newDir = `${playerDataDir}/${dirName}`;
    if (!fs.existsSync(`${newDir}`)) {
        fs.mkdirSync(newDir);
    }

    fs.writeFile(`${newDir}/${fileName}.json`, data, (err) => {
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

function generatePlayerData() {
    console.log(`generatePlayerData::generatePlayerData`);
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }

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

        writeToPlayerFile('gameType', player, JSON.stringify(groupByGameType(filterdReplays)));
        writeToPlayerFile('hero', player, JSON.stringify(groupByHero(filterdReplays, blizzID)));
    });
}

module.exports = generatePlayerData;