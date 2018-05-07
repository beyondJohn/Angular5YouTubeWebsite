import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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
      this.updateCaption();
    });
  }
  public getJSON(): Observable<any> {
    return this._http.get("./assets/transcipts/God_of_War_15_Minutes_of_Gameplay_-_PS4_Gameplay_Walkthrough__PS_Underground.json")
  }
  updateCaption() {
    let timestamps: Array<object> = this.transcription.transcipt.text;
    let adder = 0;
    let captionTimeout = setTimeout(() => {
      timestamps.forEach(time => {
        adder++;
        if (this.currentTime + time['dur'] < time['start']) {// found next caption, go back 1 for current
          this.caption = timestamps[adder]['text'];
          return;
        }
      }
      );
    }, 100);
  }

}
class capTime {
  start?;
  dur?;
  text?;
}