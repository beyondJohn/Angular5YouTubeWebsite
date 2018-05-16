import { Injectable } from '@angular/core';
let _window: any = window;
declare var YT: any;

@Injectable()
export class YoutubeService {

  constructor() { }
  public playerPause;
  myplayer;
  public createPlayer(): void {
    // let interval = setInterval(() => {
    //   // tslint:disable-next-line:max-line-length
    //   if ((typeof _window.YT !== 'undefined') && _window.YT && _window.YT.Player) {
    //     console.log('Have youtube player!');
    //     var player;
    //     let onYouTubeIframeAPIReady = () => {
    //       console.log('inside onready');
    //       player = new YT.Player('player', {
    //         height: '390',
    //         width: '640',
    //         videoId: 'De6uAzvOx5E',
    //         autoplay: 1,
    //         checkOrigin:false,
    //         events: {
    //           'onReady': onPlayerReady,
    //           'onStateChange': this.onPlayerStateChange
    //         }
    //       });
    //       this.myplayer = player;
    //     }

    //     onYouTubeIframeAPIReady();
    //     clearInterval(interval);
    //   }
    // }, 200);
    // let onPlayerReady = (event) => {
    //   console.log('real onready'); 
    //   console.log(event.target.a.contentWindow);
    //   console.log(typeof event.target.a);
    //   console.log(typeof event.target);
    //   let myTarget = event.target.a;
    //   setTimeout(()=>{this.myplayer.playVideo()},5000);
    //   const player = _window.document.getElementById('player') as HTMLIFrameElement;
    //   var youtube_command = JSON.stringify({ event: 'command', func: 'playVideo' });
    //   var myplayer = player.contentWindow;
    //   event.target.a.contentWindow.postMessage(youtube_command, 'https://www.youtube.com');
    //   console.log(event.target.getPlayerState());
    //   //event.target.playVideo();
    // }
  }
  onPlayerReady(event) {
    //event.target.playVideo();
    // const player = document.getElementById('player') as HTMLIFrameElement;
    // var youtube_command = JSON.stringify({ event: 'command', func: 'playVideo' });
    // var myplayer = player.contentWindow;
    // myplayer.postMessage(youtube_command, 'https://www.youtube.com');
    console.log('event: ', event);
    // console.log('eventtarget: ', event.target['y']);
    // this.playerPause = event.target.pauseVideo();
  }
  onPlayerStateChange(event) {
    var done = false;
    if (event.data == YT.PlayerState.PLAYING && !done) {
      //setTimeout(stopVideo, 6000);
      done = true;
    }
  }
}
