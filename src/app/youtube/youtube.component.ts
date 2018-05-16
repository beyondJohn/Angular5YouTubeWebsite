import { Component, OnInit, AfterContentInit } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
let _window: any = window;
declare var YT: any;
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit, AfterContentInit {

  constructor(
    private _yt: YoutubeService
  ) { }
  origin;
  player;
  ngOnInit() {
    this.origin = escape(window.location.origin).replace(/\//g, "%2F");
    let end = setInterval(()=>{
      if(this.state === 0){
        console.log('ended');
        clearInterval(end);
        this.player.cueVideoById('D_JNQKlA57k');
        this.player.playVideo();
      }
    },1000)
  }
  state = -2;
  public ngAfterContentInit() {
    let doc = window.document;
    let playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api?enablejsapi=1&origin=' + this.origin + '&autoplay=1&widgetid=3&controls=0&cc_load_policy=3&iv_load_policy=3&showinfo=0&modestbranding=1&rel=0&autohide=0&html5=1';
    doc.body.appendChild(playerApi);
    var player;
    let myinterval = setInterval(() => {
      // tslint:disable-next-line:max-line-length
      if ((typeof _window.YT !== 'undefined') && _window.YT && _window.YT.Player) {
        console.log('Have youtube player!');

        let onYouTubeIframeAPIReady = () => {
          console.log('inside onready');
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'De6uAzvOx5E',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
          this.player = player;
        }

        onYouTubeIframeAPIReady();
        clearInterval(myinterval);
      }
    }, 200);
    let onPlayerStateChange = (event) => {
      console.log('event changed');
      let src = 'https://www.youtube.com/embed/De6uAzvOx5E?enablejsapi=1&origin=' + this.origin + '&autoplay=1&widgetid=3&controls=0&cc_load_policy=3&iv_load_policy=3&showinfo=0&modestbranding=1&rel=0&autohide=0';
    if (event.data === -1) {
      let iframe = document.getElementsByTagName('iframe')[0];

      iframe.setAttribute('style', 'width:640; height:360');
      //iframe.setAttribute('class', 'video');
      iframe.setAttribute("src", src);
      //this.player.playVideo();

    }
    }
    let onPlayerReady = (event) => {
      console.log('real onready');
      // console.log(event.target.a.contentWindow);
      // console.log(event.target.a);
      // console.log(event.target);
      let myTarget = event.target.a;
      //setTimeout(() => { this.myplayer.playVideo() }, 5000);
      let iframe = document.getElementsByTagName('iframe')[0];
      var youtube_command = JSON.stringify({ event: 'command', func: 'pauseVideo' });

      iframe.contentWindow.postMessage(youtube_command, '*');
      console.log(event.target.getPlayerState());
      // const player = _window.document.getElementById('player') as HTMLIFrameElement;
      setTimeout(()=>{
        let iframe1 = document.getElementsByTagName('iframe')[0];
        var youtube_command1 = JSON.stringify({ event: 'command', func: 'playVideo' });
        iframe1.contentWindow.postMessage(youtube_command1, '*');
      },1000);
      let playing = setInterval(()=>{
        let iframe2 = document.getElementsByTagName('iframe')[0];
        this.state = event.target.getPlayerState();
        console.log(this.state);
        if(this.state === 0){
          clearInterval(playing);
        }
      },1000);
      // var myplayer = player.contentWindow;
      //event.target.a.contentWindow.postMessage(youtube_command1, '*');
      console.log(event.target.getPlayerState());
      
      
      console.log(event.target.getPlayerState());
      // event.target.pauseVideo();
      //console.log('final: ',event.target.playVideo().playVideo());
      //event.target.playVideo();
    }
    // let interval = setInterval(() => {
    //   // tslint:disable-next-line:max-line-length
    //   if ((typeof _window.YT !== 'undefined') && _window.YT && _window.YT.Player) {
    //     let onPlayerReady = (event) =>{console.log('ready');}
    //     console.log('have confirmation from ts');
    //     //console.log(YT.Player);
    //     // clearInterval(interval);
    // //     let playerControls = doc.createElement('script');
    // //     playerControls.type = 'text/javascript';
    // //     playerControls.src = 'assets/playercontrols.js';
    // //     window.document.body.appendChild(playerControls);
    // //     clearInterval(interval);
    // //     let playInterval = setInterval(()=>{
    // //       if (typeof _window.start !== 'undefined') {
    // //         _window.start();
    // //         clearInterval(playInterval);
    // //       }
    // //     },100);
    //   }
    // }, 1000);
  }
  pause() {
    const player = document.getElementById('player') as HTMLIFrameElement;
    var youtube_command = JSON.stringify({ event: 'command', func: 'pauseVideo' });
    var myplayer = player.contentWindow;
    myplayer.postMessage(youtube_command, 'https://www.youtube.com');
  }
  play() {
    const player = document.getElementById('player') as HTMLIFrameElement;
    var youtube_command = JSON.stringify({ event: 'command', func: 'playVideo' });
    var myplayer = player.contentWindow;
    myplayer.postMessage(youtube_command, 'https://www.youtube.com');
    //_window.start();

  }
  cap() {
    const player = document.getElementById('player') as HTMLIFrameElement;
    var youtube_command = JSON.stringify({ event: 'command', func: 'playVideo' });
    var myplayer = player.contentWindow;
    myplayer.postMessage(youtube_command, 'https://www.youtube.com');
  }

}
