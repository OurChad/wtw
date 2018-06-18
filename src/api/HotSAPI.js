const axios = require('axios');

const hotsAPI = axios.create({
    baseURL: 'https://hotsapi.net/api/v1/',
    timeout: 30000,
    headers: {'accept': 'application/json'}
});

class HotSAPI {

    static async getReplays(params) {
        console.log(`HostAPI::getReplays`);
        const resp = await hotsAPI.get(`replays`, params);

        return resp.data;
    }

    static async getReplaysPaged(params) {
        console.log(`HostAPI::getReplaysPaged`);
        const resp = await hotsAPI.get(`replays/paged`, {params});

        return resp.data;
    }

    static async getHeroes() {
        console.log(`HostAPI::getHeroes`);
        const resp = await hotsAPI.get(`heroes`);

        return resp.data;
    }
}

module.exports = HotSAPI;