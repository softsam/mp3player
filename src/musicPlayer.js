'use strict';

const Player = require('play-sound');
const fs = require('fs');

class MusicPlayer {

    constructor() {
        this.isPlaying = false;
        this.player = new Player();
    }

    playRandom(callback) {
        if (this.isPlaying) {
            console.log('Already playing');
            return;
        }

        this.listMp3s((err, mp3) => {
            if (err || !mp3 || mp3.length === 0) {
                console.log('No mp3 found');
                callback('No mp3 found');
                return;
            }
            this.isPlaying = true;
            let mp3ToPlay = './mp3/' + mp3[Math.floor(Math.random() * mp3.length)];
            console.log('Playing ' + mp3ToPlay);
            this.player.play(mp3ToPlay, (err) => {
                if (err) {
                    console.log('Failed to play ' + mp3ToPlay);
                }
                this.isPlaying = false;
            });
            callback(null, mp3ToPlay);
        });
    }

    listMp3s(callback) {
        fs.readdir('./mp3/', (err, files) => {
            let mp3 = [];
            files.forEach(file => {
                if (file.endsWith('.mp3')) {
                    mp3.push(file);
                }
            });
            callback(err, mp3);
        })
    }
}

module.exports = MusicPlayer;