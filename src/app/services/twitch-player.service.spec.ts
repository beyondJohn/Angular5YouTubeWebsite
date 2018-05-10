import { TestBed, inject } from '@angular/core/testing';

import { TwitchPlayerService } from './twitch-player.service';

describe('TwitchPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwitchPlayerService]
    });
  });

  it('should be created', inject([TwitchPlayerService], (service: TwitchPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
