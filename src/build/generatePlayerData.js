const fs = require('fs');
const _ = require('lodash');
const hotsAPI = require('../api');

const generatedDir = `${__dirname}/../generated`;


const players = {
    7349829: 'Chaxtreme',
    2560109: 'EaMo',
    7325363: 'havocx42',
    2875722: 'wevansly',
    102373: 'Okopolitan',
    6750654: 'ufu',
    2894009: 'Lovare',
    691334: 'Mariodroepie',
};

const teamComps = new Map();

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
    const heroReplayData = _(replays)
        .orderBy('game_date')
        .groupBy((replay) => {
            const playerInstance = _.find(replay.players, (matchPlayer) => {
                return matchPlayer.blizz_id === blizzID;
            });
            const hero = playerInstance.hero;
            // getReplaysPaged returns hero as an object
            return typeof hero === 'string' ? hero : hero.attribute_id;
        })
        .value();

    const heroNames = Object.keys(heroReplayData);
    const heroData = {};
    heroNames.forEach(heroName => {
        heroData[heroName] = {};

        const heroGameData = heroReplayData[heroName];
        let winCount = 0;
        // Check each game with hero and mark if player won
        heroGameData.forEach(gameData => {            
            if (_.find(gameData.players, player => player.blizz_id === blizzID && player.winner)) {
                winCount++;
            }

            const playerHero = _.find(gameData.players, player => player.hero.attribute_id && player.hero.attribute_id === heroName);
            if (playerHero) {
                heroData[heroName].hero = playerHero.name; 
            }
        });

        heroData[heroName].numberOfGames = heroGameData.length;
        heroData[heroName].winPercentage = Number.parseFloat((winCount / heroGameData.length) * 100).toFixed(2);
    });
    
    return heroData;
}

function groupByTeamComp(replays, blizzID) {
    const teamReplayData = _(replays)
        .orderBy('game_date')
        .filter(replay => replay.game_type !== 'Brawl')
        .groupBy((replay) => {
            const playerInstance = _.find(replay.players, (matchPlayer) => {
                return matchPlayer.blizz_id === blizzID;
            });
            const isWinner = playerInstance.winner;
            // getReplaysPaged retunrs hero as an object
            return isWinner ? 'Win' : 'Loss';
        })
        .value();

    const gameOutcome = Object.keys(teamReplayData);
    gameOutcome.forEach(outcome => {
        const teamGameData = teamReplayData[outcome];

        teamGameData.forEach(gameData => {
            const playerBlizzIDs = Object.keys(players);
            const teamPlayers = gameData.players.filter(player => playerBlizzIDs.includes(`${player.blizz_id}`));

            if (teamPlayers.length > 1) {                
                addCompositionToTeamCompMap(gameData, teamPlayers, outcome === 'Win');
            }
        });
    });
    
    return teamComps;
}

function addCompositionToTeamCompMap(gameData, teamPlayers, isWin) {
    const compMapKey = teamPlayers.map(player => player.hero.name)
        .sort(sortHeroNames) // Sort hero names so key is always the same
        .reduce((keyAcc, name) => {
            keyAcc += name;
            return keyAcc;
        }, '');

    const teamPlayersData = teamPlayers.reduce((playersAcc, player) => {
        playersAcc.push({
            hero: player.hero.name,
            blizzID: player.blizz_id,
            playerName: players[`${player.blizz_id}`]
        });

        return playersAcc;
    }, []);

    const winningTeamComp = gameData.players.filter(player => player.winner).map(player => player.hero.name);
    const losingTeamComp = gameData.players.filter(player => !player.winner).map(player => player.hero.name);

    const compData = {
        gameID: gameData.id,
        gameType: gameData.game_type,
        mapName: gameData.game_map,
        isWin,
        teamPlayers: teamPlayersData,
        winningTeamComp,
        losingTeamComp
    };

    const existingCompData = teamComps.get(compMapKey);

    // If a comp entry already exists in the map but not for an existing game, add it to the entry
    if (existingCompData) {
        if (!_.find(existingCompData, (comp) => comp.gameID === gameData.id)) {
            teamComps.set(compMapKey, existingCompData.concat(compData));        
        }
    } else {
        teamComps.set(compMapKey, [compData]);
    }
}

function sortHeroNames(hero1, hero2) {
    const nameA = hero1.toUpperCase(); // ignore upper and lowercase
    const nameB = hero2.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}

function generatePlayerData() {
    console.log('generatePlayerData::generatePlayerData');
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }

    const numberOfPlayers = Object.keys(players).length;
    let entryCount = 1;
    Object.entries(players).forEach(async ([blizzID, player]) => {
        blizzID = Number.parseInt(blizzID);
        const replays = await getReplaysPaged({
            start_date: '2017-06-01',
            end_date: '2018-12-31',
            player,
            with_players: true
        });

        const filterdReplays = replays.filter((replay) => {
            return replay.players.some((matchPlayer) => matchPlayer.blizz_id === blizzID);
        });

        // writeToPlayerFile('gameType', player, JSON.stringify(groupByGameType(filterdReplays)));
        writeToPlayerFile('hero', player, JSON.stringify(groupByHero(filterdReplays, blizzID)));
        groupByTeamComp(filterdReplays, blizzID);

        if (entryCount === numberOfPlayers) {
            writeToPlayerFile('team', 'team_comps', JSON.stringify([...teamComps]));
        }

        entryCount++;
    });

}

module.exports = generatePlayerData;