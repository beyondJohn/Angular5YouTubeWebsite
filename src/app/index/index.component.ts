import { Component, OnInit } from '@angular/core';
import { YoutubeComponent } from 'angularx-youtube';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CaptionsComponent } from '../captions/captions.component';
import { WindowRef } from '../services/window-ref.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _login: LoginService,
    private _window: WindowRef
  ) { }
  windowRef: WindowRef;
  ngOnInit() {
    this.origin = escape(window.location.origin).replace(/\//g, "%2F");
    this.routes = this._activatedRoute.params.subscribe(params => {
      this.params = params;
      this.src = params['src'];
    });
    this.windowRef = this._window;
    let myWindow = this._window;

  }
  vidTitle;
  currentTime;
  src;
  params;
  origin: string;
  title = 'app';
  player;
  ids: Array<string> = ['D_JNQKlA57k', '2e-yAATMjBI', 'De6uAzvOx5E'];//, 'vjy6FVNwCdU' spanish/english captions
  currentvideoindex = 2;
  id = this.ids[2];
  onetime = 0;
  routes;
  onApiChange(event) {
    // console.log('apiChange ready');
  }
  playing = false;
  play() { //autoplay fallback
    // getPlayerState() -1 = unstarted, 0 = ended, 1 = playing, 2 = pause, 3 = buffering, 5 = viceo cued (no 4)
    if (this.playing === false) { 
      if (this.player.getPlayerState() !== undefined && this.player.getPlayerState() !== 1) {
        this.player.playVideo();
        this.playing = false;
      }
      else {
        this.play();
      }
    }
  }
  onReady(player): void {
    this.player = player;
    this.player.setVolume(60);


    if (this.setPosition === true) {
      this.player.cueVideoById(this.ids[this.currentvideoindex]);
      this.player.seekTo(this.currentPosition);
      this.setPosition = false;
      if (typeof this.volume !== undefined) {
        this.player.setVolume(this.volume);
      }
    }
    let checkEnded = (check) => {
      if (check === 0) {// ended
        //clearInterval(myInterval);
      }
    }
    this.onetime = 0;
    let myInterval = setInterval(() => {
      if (this.onetime === 0) {

        this.onetime = 1;
        document.getElementById('video').setAttribute('class', 'video');
      }

      let playerState = this.player.getPlayerState();
      if (playerState !== 1) {// unstarted
        if (playerState === 0) {// ended
          this.vidTitle = this.player.getVideoData()['title'];
          document.getElementsByClassName('notification')[0].setAttribute('style', 'top:30px;');

          checkEnded(0);
          // console.log('ended: ',this.player.getVideoData());
          this.onetime = 0;
          this.currentvideoindex = this.currentvideoindex === 0 ? 1 : 0;
          this.player.cueVideoById(this.ids[this.currentvideoindex]);
          console.log('player changed');
          this.playing = false;
          setTimeout(() => { this.play() }, 200)
          setTimeout(() => {
            document.getElementsByClassName('notification')[0].setAttribute('style', 'top:-400px;');
          }, 6000)
        }
      }
      this.currentTime = this.player.getCurrentTime();
      // console.log('ended: ',this.player.getVideoData());
    }, 3000)
  }
  onChange(event): void {

    let src = 'https://www.youtube.com/embed/?enablejsapi=1&amp;origin=' + this.origin + '&amp;widgetid=1&controls=0&cc_load_policy=0&iv_load_policy=3&showinfo=0&modestbranding=1&rel=0&autohide=0';
    if (event.data === -1) {
      let iframe = document.getElementsByTagName('iframe')[0];

      iframe.setAttribute('style', 'width:100%; height:100%');
      //iframe.setAttribute('class', 'video');
      iframe.setAttribute("src", src);
      this.player.playVideo();

    }
    // console.log('event.target: ',event.target.getOptions()); 
    if (event.data === 2) {//buffering
      // console.log('buffering');
    }
    else if (event.data === 1) {//playing
      // console.log('playing');
    }
    else if (event.data === 3) {//cued
      this.player.setOption("captions", "fontSize", 1);
    }
  }

  changeVid() {
    // this.player.unloadModule("captions");

    // update user info
    // let token = localStorage.getItem('authToken');
    // let myLogin = this._login.updateUserInfo(token);

    //twitch test
    let twitchTest = this._login.twitch();
    
  }
  setPosition = false;
  currentPosition;
  volume;
  ccSet = false;
  removecc() {

    this.setPosition = true;
    this.currentPosition = this.player.getCurrentTime();
    this.volume = this.player.getVolume();
    let iframe = document.getElementsByTagName('iframe')[0];
    this.ccSet = !this.ccSet;
    this.ccSet === true ?
      iframe.setAttribute("src", 'https://www.youtube.com/embed/?enablejsapi=1&amp;origin=' + this.origin + '&amp;widgetid=1&controls=0&cc_load_policy=1&iv_load_policy=3&showinfo=0&modestbranding=1&rel=0&autohide=0')
      :
      iframe.setAttribute("src", 'https://www.youtube.com/embed/?enablejsapi=1&amp;origin=' + this.origin + '&amp;widgetid=1&controls=0&cc_load_policy=0&iv_load_policy=3&showinfo=0&modestbranding=1&rel=0&autohide=0');
    // login
    // this._router.navigate(["FarCry5"]);
    // let myLogin = this._login.login();

  }
  mouseover(el) {
    //console.log(el);
    if (el === 'volume3') {

      if (this.sliderActive === false) {
        document.getElementsByClassName('volume-slider')[0].classList.remove('appear');
        document.getElementsByClassName('volume-slider')[0].classList.remove('fadein');
        // document.getElementsByClassName('volume-slider')[0].classList.remove('fadeout');
        document.getElementsByClassName('volume-slider')[0].classList.add('appear');
        setTimeout(() => {
          document.getElementsByClassName('volume-slider')[0].classList.add('fadein');
        }, 100);
      }
    }
    let src = '../../assets/images/desktop/' + el + 'active.png';
    document.getElementsByClassName(el)[0].setAttribute('src', src);
  }
  mouseout(el) {
    if (el === 'volume3') {
      if (this.sliderActive === false) {
        document.getElementsByClassName('volume-slider')[0].classList.remove('fadein');
      }
      setTimeout(() => {
        if (document.getElementsByClassName('volume3')[0].getAttribute('src').indexOf('active') === -1) {
          document.getElementsByClassName('volume-slider')[0].classList.remove('fadein');
        }
      }, 1000)
    }
    let src = '../../assets/images/desktop/' + el + '.png';
    document.getElementsByClassName(el)[0].setAttribute('src', src);
    this.ccSet === true ?
      document.getElementsByClassName('cc3')[0].setAttribute('src', '../../assets/images/desktop/cc3active.png')
      :
      document.getElementsByClassName('cc3')[0].setAttribute('src', '../../assets/images/desktop/cc3.png')
  }
  sliderActive = false;
  sliderMouseover() {
    let element: HTMLElement = document.getElementsByClassName('vranger')[0] as HTMLElement;
    let myvolume = '';
    let myplayer = this.player;
    element.oninput = function () {

      myvolume = (document.getElementsByClassName('vranger')[0] as HTMLInputElement).value;
      myplayer.setVolume(myvolume);
    };

    this.sliderActive = true;
    document.getElementsByClassName('volume3')[0].setAttribute('src', '../../assets/images/desktop/volume3active.png');
    document.getElementsByClassName('volume-slider')[0].classList.add('fadein');
  }
  sliderContainerMouseout() {
    this.sliderActive = false;
    document.getElementsByClassName('volume3')[0].setAttribute('src', '../../assets/images/desktop/volume3.png');
    document.getElementsByClassName('volume-slider')[0].classList.remove('fadein');
    //console.log('myVolume', this.player.getVolume());
  }
  sliderMouseout() {
    this.sliderActive = false;
    document.getElementsByClassName('volume3')[0].setAttribute('src', '../../assets/images/desktop/volume3.png');
    // document.getElementsByClassName('volume-slider')[0].classList.remove('fadein');
    //document.getElementsByClassName('volume-slider')[0].classList.add('fadeout');
    setTimeout(() => {
      document.getElementsByClassName('volume-slider')[0].classList.remove('appear');
    }, 700);
  }
  mute = true;
  volumeClick() {
    let playerVolume;
    this.player.getVolume() > 0 ? this.mute = false : this.mute = true;
    this.mute === true ? playerVolume = 60 : playerVolume = 0;
    this.player.setVolume(playerVolume)
    this.mute = !this.mute;
    let element: HTMLElement = document.getElementsByClassName('vranger')[0] as HTMLElement;
    let myvolume = (document.getElementsByClassName('vranger')[0] as HTMLInputElement).value = playerVolume;
  }
  textSize = 3;
  resizeText() {
    this.textSize = this.textSize === 3 ? 1 : 3;
    console.log("textResize");
    this.player.setOption("captions", "fontSize", this.textSize); // -1 to 3
    this.player.setOption("captions", "track", {"languageCode": "es"});
  }

}
