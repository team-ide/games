import http from './http';
import config from './game.config';

let game = {
    async config(param) {
        if (config != null) {

            return {
                code: 0,
                data: config,
            }
        }
        return await http.post('api/game/config', param);
    },
};


export default game;