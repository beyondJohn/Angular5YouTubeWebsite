import { Component, AfterContentInit, EventEmitter } from '@angular/core';
import { TwitchPlayerService } from '../services/twitch-player.service';
import { WindowRef } from '../services/window-ref.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { LoginService } from '../services/login.service';
let _window: any = window;
declare var Twitch: any;

@Component({
    selector: 'app-twitch',
    templateUrl: './twitch.component.html',
    styleUrls: ['./twitch.component.css']
})
export class TwitchComponent implements AfterContentInit {

    public minPlayer: boolean = true;
    public superMinPlayer: boolean = false;
    public fullscreenActive: boolean = false;
    //public currentVideoText: string = 'None';

    constructor(
        private twitchplayerservice: TwitchPlayerService
        , private _http: HttpClient
        , private _config: Config
        , private _login: LoginService
    ) {
        // tslint:disable-next-line:max-line-length
        //this.twitchplayerservice.currentVideoText.subscribe((event) => this.currentVideoText = event || 'None');
    }

    options = { responseType: 'text' as 'text' };

    // Dynamically embed our API String for Interative Twitch videos
    public ngAfterContentInit() {
        let doc = window.document;
        let playerApi = doc.createElement('script');
        playerApi.type = 'text/javascript';
        playerApi.src = 'http://player.twitch.tv/js/embed/v1.js';
        doc.body.appendChild(playerApi);
        this.twitchplayerservice.createPlayer();
        this.getTitle();

    }
    title: string = '';
    name;
    game;
    private getTitle() {
        const options = { responseType: 'text' as 'text' };
        // console.log(this.twitchplayerservice.twitch_player);
        // console.log(this.twitchplayerservice.twitch_player.getPlaybackStats());


        let checkReady = setInterval(() => {
            if (this.twitchplayerservice.ready === true) {
                setTimeout(()=>{
                    this._http.get(this._config.urls.twitchAPI + this.twitchplayerservice.channelId, this.options).subscribe(
                        data => {
                            let myData = JSON.parse(data);
    
                            this.title = myData['stream']['channel']['status'];
                            this.name = myData['stream']['channel']['display_name'];
                            this.game = myData['stream']['channel']['game'];
                            document.getElementsByClassName('twitch-info')[0].classList.add('twitch-info-show');
                        });
                    clearInterval(checkReady);
                },300)
            }
        }, 400)
    }
    // tslint:disable-next-line:member-access
    public togglePlayer(): void {
        this.minPlayer = !this.minPlayer;
        this.superMinPlayer = false;
    }

    // tslint:disable-next-line:member-access
    toggleFullscreen(): void {
        this.minPlayer = false;
        this.superMinPlayer = false;
        this.fullscreenActive = !this.fullscreenActive;
        let width = this.fullscreenActive ? window.innerWidth - 70 : 440;
        let height = this.fullscreenActive ? window.innerHeight - 120 : 250;
        this.twitchplayerservice.resizePlayer(width, height);
    };

    // tslint:disable-next-line:member-access
    minimizePlayer(): void {
        this.superMinPlayer = !this.superMinPlayer;
    }
}
