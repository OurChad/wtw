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
    'Chaxtreme': 7349829,
    'EaMo': 2560109,
    'havocx42': 7325363,
    'wevansly': 2875722,
    'Okopolitan': 102373,
    'ufu': 6750654
};

async function getReplays(params) {
    console.log('generatePlayerData::getReplays');
    return await hotsAPI.getReplays({ params });
}

async function getReplaysPaged(params) {
    console.log('generatePlayerData::getReplaysPaged');
    let allReplays = [];
    let page = 1;
    params = Object.assign({}, params, { page });
    const replay = await hotsAPI.getReplaysPaged({ params });
    allReplays = allReplays.concat(replay.replays);

    if (replay.page_count > page) {
        allReplays = getReplaysByPage(page++, replay.page_count, params);
    }

    return allReplays;
}

async function getReplaysByPage(page, pageCount, params) {
    console.log('generatePlayerData::getReplaysByPage');
    let allReplays = [];
    params = Object.assign({}, params, { page });
    const replay = await hotsAPI.getReplaysPaged({ params });
    allReplays = allReplays.concat(replay.replays);

    if (pageCount > page) {
        getReplaysByPage(page++, pageCount, params);
    }

    return allReplays;
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
        .value();
}

function groupByHero(replays, blizzID) {
    const heroData = _(replays)
        .orderBy('game_date')
        .groupBy((replay) => {
            const playerInstance = _.find(replay.players, (matchPlayer) => {
                return matchPlayer.blizz_id === blizzID;
            });
            const hero = playerInstance.hero;
            // getReplaysPaged retunrs hero as an object
            return typeof hero === 'string' ? hero : hero.name;
        })
        .value();

    const heroNames = Object.keys(heroData);
    heroNames.forEach(heroName => {
        const heroGameData = heroData[heroName];

        // Check each game with hero and mark if player won
        heroGameData.forEach(gameData => {
            gameData.isWinner = false;
            
            if (_.find(gameData.players, player => player.hero === heroName && player.winner)) {
                gameData.isWinner = true;
            }
            const playerBlizzIDs = Object.values(players);
            gameData.teamPlayers = gameData.players.filter(player => playerBlizzIDs.includes(player.blizz_id))
                .map(player => player);
        });
    });
    
    return heroData;
}

function generatePlayerData() {
    console.log('generatePlayerData::generatePlayerData');
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }

    Object.entries(players).forEach(async ([player, blizzID]) => {
        const replays = await getReplaysPaged({
            start_date: '2017-11-01',
            end_date: '2018-11-01',
            player,
            with_players: true
        });

        const filterdReplays = replays.filter((replay) => {
            return replay.players.some((matchPlayer) => matchPlayer.blizz_id === blizzID);
        });

        writeToPlayerFile('gameType', player, JSON.stringify(groupByGameType(filterdReplays)));
        writeToPlayerFile('hero', player, JSON.stringify(groupByHero(filterdReplays, blizzID)));
    });
}

module.exports = generatePlayerData;