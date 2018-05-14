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

  ngOnInit() {
  }
  public ngAfterContentInit() {
    let doc = window.document;
    let playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api?enablejsapi=1&origin=http://localhost:4200';
    doc.body.appendChild(playerApi);
    this._yt.createPlayer();
    // this.getTitle();
  }
  pause(){
    const player  = document.getElementById('player') as HTMLIFrameElement;
    var youtube_command = JSON.stringify( { event: 'command', func: 'pauseVideo' } );
    var myplayer = player.contentWindow;
    myplayer.postMessage(youtube_command,'https://www.youtube.com');
    
  }
  play(){
    const player  = document.getElementById('player') as HTMLIFrameElement;
    var youtube_command = JSON.stringify( { event: 'command', func: 'playVideo' } );
    var myplayer = player.contentWindow;
    myplayer.postMessage(youtube_command,'https://www.youtube.com');
  }
  cap(){
    const player  = document.getElementById('player') as HTMLIFrameElement;
    var youtube_command = JSON.stringify( { event: 'command', func: 'playVideo' } );
    var myplayer = player.contentWindow;
    myplayer.postMessage(youtube_command,'https://www.youtube.com');
  }

}
