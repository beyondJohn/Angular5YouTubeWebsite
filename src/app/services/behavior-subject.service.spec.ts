import { TestBed, inject } from '@angular/core/testing';

import { BehaviorSubjectService } from './behavior-subject.service';

describe('BehaviorSubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BehaviorSubjectService]
    });
  });

  it('should be created', inject([BehaviorSubjectService], (service: BehaviorSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
