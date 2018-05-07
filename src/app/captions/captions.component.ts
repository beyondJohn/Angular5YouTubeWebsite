import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-captions',
  templateUrl: './captions.component.html',
  styleUrls: ['./captions.component.css']
})
export class CaptionsComponent implements OnInit {

  constructor(private _http: HttpClient) {


  }
  @Input() currentTime: number;
  transcription;
  caption;
  ngOnInit() {
    this.getJSON().subscribe(transcription => {
      this.transcription = transcription;

    });
    let adder = 0;
    let that = this;
    let loadInterval = setInterval(() => {
      adder++;
      if (this.currentTime === undefined) {
        console.log('curtime', adder);
      }
      else {
        this.updateCaption(that);
        clearInterval(loadInterval);
      }
    }, 1000);
  }
  public getJSON(): Observable<any> {
    return this._http.get("../../assets/transcripts/God_of_War_15_Minutes_of_Gameplay_-_PS4_Gameplay_Walkthrough__PS_Underground.json");
  }
  updateCaption(scope) {

    let timestamps: Array<object> = scope.transcription.transcript.text;
    let adder = 0;
    let match = false;
    const source = timer(10,10);
    let waitforQue = () => {
      // var start = Date.now();
      // setInterval(() => {
      //     let delta = Date.now() - start; // milliseconds elapsed since start
        
      //     let output = (Math.floor(delta / 1000)); // in seconds
      //     console.log(output);
      //     // alternatively just show wall clock time:
      //     //output(new Date().toUTCString());
      // }, 100); // update about every second
      
      //const subscribe = source.subscribe(val => console.log(val));
    }
    timestamps.forEach(time => {
      adder++;
      if (scope.currentTime + time['dur'] < time['start']) {// found next caption, go back 1 for current
        if (match === false) {
          if (time['start'] > scope.currentTime) {
            waitforQue();
            match = true;
          }
        }
      } 
    }
    );
    let waitingForQue;

      // waitingForQue = setInterval(() => {
      //   scope.caption = timestamps[adder - 1]['text'];
      //   console.log("caption", scope.caption);

        
      // },100);
    
    let cancelWaitForQueInterval = () =>{
      //clearInterval(waitingForQue);
    }
  }

}
class capTime {
  start?;
  dur?;
  text?;
}