const axios = require('axios');

const hotsAPI = axios.create({
    baseURL: 'https://hotsapi.net/api/v1/',
    timeout: 10000,
    headers: {'accept': 'application/json'}
});

class HotSAPI {

    static async getReplays(params) {
        const resp = await hotsAPI.get(`replays`, params);

        return resp.data;
    }

    static async getReplaysPaged(params) {
        const resp = await hotsAPI.get(`replays/paged`, {params});

        return resp.data;
    }

    static async getHeroes() {
        const resp = await hotsAPI.get(`heroes`);

        return resp.data;
    }
}

module.exports = HotSAPI;