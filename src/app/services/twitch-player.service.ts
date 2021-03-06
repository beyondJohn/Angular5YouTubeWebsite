import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubjectService } from './behavior-subject.service';

let _window: any = window;
declare var Twitch: any;

@Injectable()
export class TwitchPlayerService {

    public twitch_player;
    public width: string = '640';
    public height: string = '360';
    public ready: boolean = false;
    //@Output() public currentVideoText: EventEmitter<any> = new EventEmitter(true);
    private currentVideoId: string;

    constructor(
        private _behaviorSubject: BehaviorSubjectService
    ) {
        this._behaviorSubject.twitchChannel.subscribe(channel => this.channel = channel['channel'])
    }
    channel;
    channelId;
    playerState: Array<object> = [];
    public createPlayer(): void {
        let options = {
            width: this.width,
            height: this.height,
            channel: this.channel //ninja sypherpk dinglederper femsteph tsm_myth nickeh30
            // video:  'ba349bcb-241f-4ce1-b731-f1d566556bcd'
        };
        let addListeners = false;
        let interval = setInterval(() => {
            // tslint:disable-next-line:max-line-length
            if ((typeof _window.Twitch !== 'undefined') && _window.Twitch && _window.Twitch.Player) {
                let playerObject: object = {};
                let playerBridge: object = {};
                let playerState: Array<object> = [];
                this.twitch_player = new Twitch.Player('twitch-player', options);
                this.twitch_player.setMuted(false);
                this.twitch_player.addEventListener(Twitch.Player.READY, _ => {
                    let getInfo = () => {
                        playerObject = this.twitch_player;
                        this.playerState[0] = playerObject;
                        //playerState = JSON.stringify(playerBridge);
                        setTimeout(() => {
                            this.channelId = this.playerState[0]['_bridge']['_playerState']['channelId'];
                            document.getElementsByTagName('iframe')[0].setAttribute('style', 'width:100%; height:100%');
                            if (this.channelId === 0) {
                                getInfo();
                            }
                            else {
                                this.ready = true;
                            }
                        }, 200);

                    };
                    getInfo();

                });
                console.log("clearInterval");
                clearInterval(interval);
            }
        }, 400);
    }
    isReady() {
        this.ready = true;
    }
    //   public playVideo(video: any) {
    //       if (!this.twitch_player) {
    //           console.log('Video Player is Loading');
    //       }
    //       this.twitch_player.setVideo(video._id);
    //       this.currentVideoId = video._id;
    //       this.currentVideoText.emit(video.title);
    //  };
    public resizePlayer(width: number, height: number) {
        this.width = width.toString();
        this.height = width.toString();
    }

}
interface playerBridge {

}