import { Injectable } from '@angular/core';
let _window: any = window;
declare var YT: any;

@Injectable()
export class YoutubeService {

  constructor() { }
  public playerPause;
  public createPlayer(): void {
    let interval = setInterval(() => {
      // tslint:disable-next-line:max-line-length
      if ((typeof _window.YT !== 'undefined') && _window.YT && _window.YT.Player) {
        console.log('Have youtube player!');
        var player;
        let onYouTubeIframeAPIReady = () => {
          console.log('inside onready');
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {
              'onReady': this.onPlayerReady,
              'onStateChange': this.onPlayerStateChange
            }
          });
        }
        onYouTubeIframeAPIReady();
        clearInterval(interval);
      }
    }, 200);
  }
  onPlayerReady(event){
    event.target.playVideo();
    // console.log('event: ', event);
    // console.log('eventtarget: ', event.target['y']);
    // this.playerPause = event.target.pauseVideo();
  }
  onPlayerStateChange(event){
    var done = false;
    if (event.data == YT.PlayerState.PLAYING && !done) {
      //setTimeout(stopVideo, 6000);
      done = true;
    }
  }
}
