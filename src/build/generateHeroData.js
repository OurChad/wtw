const fs = require('fs');
const axios = require('axios');
const hotsAPI = require('../api');

const generatedDir = `${__dirname}/../generated`;
const heroDataDir = `${generatedDir}/heroData`;
let heroList = [];

function getHeroes() {
    console.log('generateHeroData::getHeroes');
    return hotsAPI.getHeroes();
}

function getIcon(iconURL) {
    return axios({
        method: 'GET',
        url: iconURL,
        responseType: 'stream'
    });
}

async function writeHeroDataToFile(hero, heroDir) {
    console.log(`generateHeroData::writeHeroDataToFile - hero: ${hero} heroDir: ${heroDir}`);
    fs.writeFile(`${heroDir}/${hero.name}.json`, JSON.stringify(hero));

    writeHeroPortraitToFile(hero, heroDir);
    writeHeroTalentIconsToFile(hero, heroDir);
}

async function writeHeroPortraitToFile(hero, heroDir) {
    console.log(`generateHeroData::writeHeroPortraitToFile - hero: ${hero} heroDir: ${heroDir}`);
    const iconURL = Object.values(hero.icon_url)[0]; // assumes icon_url has a one prop which is the URL

    writeIconToFile(hero, `${heroDir}/${hero.name}.png`, iconURL);
}

async function writeHeroTalentIconsToFile(hero, heroDir) {
    console.log(`generateHeroData::writeHeroTalentIconsToFile - hero: ${hero} heroDir: ${heroDir}`);    
    const { talents } = hero;
    const heroTalentsDir = `${heroDir}/talents`;

    if (!fs.existsSync(heroTalentsDir)) {
        fs.mkdirSync(heroTalentsDir);
    }

    talents.forEach(async (talent) => {
        const iconURL = Object.values(talent.icon_url)[0];
        writeIconToFile(hero, `${heroTalentsDir}/${talent.name}.png`, iconURL);
    });
}

async function writeIconToFile(hero, filePath, iconURL) {
    console.log(`generateHeroData::writeIconToFile - hero: ${hero} filePath: ${filePath} iconURL: ${iconURL}`);
    const icon = await getIcon(iconURL)
        .catch(() => {
            console.log(`Failed to get icon for hero: ${hero.name}`);
            console.log(`Failed file: ${filePath}`);
        });

    if (icon && icon.data) {
        icon.data.pipe(fs.createWriteStream(filePath));
    }
}

async function generateHeroData() {
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }

    if (!fs.existsSync(heroDataDir)) {
        fs.mkdirSync(heroDataDir);
    }

    const heroes = await getHeroes();
    console.log(heroes.length);
    heroes.forEach(async (hero) => {
        heroList = [...heroList, hero.name];
        const heroDir = `${heroDataDir}/${hero.name.replace(/\./gi, '')}`; // remove . from names like E.T.C.
        if (!fs.existsSync(heroDir)) {
            fs.mkdirSync(heroDir);
        }
        
        writeHeroDataToFile(hero, heroDir);
    });

    fs.writeFile(`${heroDataDir}/heroes.json`, JSON.stringify(heroList));
}

module.exports = generateHeroData;