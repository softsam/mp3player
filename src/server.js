'use strict';

const express = require('express');
const MusicPlayer = require('./musicPlayer');

class Server {

    constructor() {
        this.musicPlayer = new MusicPlayer();
        this.app = express();
        this.port = 8080;
    }

    start() {
        this.app.get('/', (req, res) => {
            this.musicPlayer.playRandom((error, mp3) => {
                if (error) {
                    res.send(error);
                    return;
                }
                res.send('Playing ' + mp3);
            });
        });

        this.app.listen(this.port, () => {
            console.log('Starting app on port ' + this.port);
        });
    }
}

module.exports = Server;