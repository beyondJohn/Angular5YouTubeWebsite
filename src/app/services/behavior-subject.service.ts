import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BehaviorSubjectService {

  constructor() { }
  //notifications
  twitchChannelObj: object = {channel:'ninja'};
  twitchChannel = new BehaviorSubject<object>(this.updateChannel());
  setTwitchChannel(channel): void {
      this.twitchChannelObj = {channel: channel['channel']};
      this.twitchChannel.next(channel);
  }
  private updateChannel(): object {
      return this.twitchChannelObj;
  }

}
