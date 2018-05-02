import { Component, OnInit } from '@angular/core';
import { YoutubeComponent } from 'angularx-youtube';
import { Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    this.origin = escape(window.location.origin).replace("/","%2F").replace("/","%2F");
    console.log(this.origin);
  }
  origin:string;
  title = 'app';
  player;
  ids: Array<string> = ['De6uAzvOx5E', '2e-yAATMjBI', 'D_JNQKlA57k'];
  currentvideoindex = 2;
  id = this.ids[2];
  playing;
  onetime = 0;
  onReady(player): void {
    this.player = player;
    let checkEnded = (check) => {
      if (check === 0) {// ended
        clearInterval(myInterval);
      }
    }
    this.onetime = 0;
    let myInterval = setInterval(() => {
      if(this.onetime === 0){
        console.log("Duration: ", this.player.getDuration()); 
        this.onetime = 1; 
      }
      console.log("current time: ", this.player.getCurrentTime());
      console.log("getPlayerState: ", this.player.getPlayerState());
      let playerState = this.player.getPlayerState();
      if ( playerState !== 1) {// unstarted
        
        if(playerState === 0){// ended
          checkEnded(0);
          console.log('ended: ',this.player.getVideoData());
          this.onetime = 0;
          this.currentvideoindex = this.currentvideoindex === 0 ? 1 : 0;
          this.player.cueVideoById(this.ids[this.currentvideoindex]);
          this.player.playVideo();
        }
      }
    }, 3000)
  }
  onChange(event): void {
    let src = 'https://www.youtube.com/embed/?enablejsapi=1&amp;origin=' + this.origin + '&amp;widgetid=1&controls=0&showinfo=0&modestbranding=1&rel=0&autohide=0'; 
    if (event.data === -1) {
      let iframe = document.getElementsByTagName('iframe')[0];
      // iframe.setAttribute('width', '640');
      // iframe.setAttribute('height', '360');
      iframe.setAttribute('style', 'width:640px; height:360px;');
      iframe.setAttribute("src", src);
      console.log("Unstarted");
    }
    if (event.data === 2) {//paused
    }
    console.log(event)
  }
  
  //dev https://www.youtube.com/embed/?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A4200&amp;widgetid=1&controls=0&showinfo=0&modestbranding=1&rel=0&autohide=0
  //prod https://www.youtube.com/embed/?enablejsapi=1&amp;origin=http%3A%2F%2Fswitchmagic.com%3A4111&amp;widgetid=1&controls=0&showinfo=0&modestbranding=1&rel=0&autohide=0

  changeVid() {
    this.currentvideoindex = this.currentvideoindex === 0 ? 1 : 0;

    console.log('change');
    this.player.cueVideoById(this.ids[this.currentvideoindex]);
    this.player.playVideo();
    console.log('change1');
    let checkEnded = (check) => {
      if (check === 0) {
        console.log('end it already!');
        clearInterval(myInterval);
      }
    }
    let myInterval = setInterval(() => {
      console.log("current time: ", this.player.getCurrentTime());
      console.log("getPlayerState: ", this.player.getPlayerState());
      if (this.player.getPlayerState() !== 1) {
        console.log('ended: ',this.player.getVideoData());
        checkEnded(0);
      }
    }, 3000)
  }
}
