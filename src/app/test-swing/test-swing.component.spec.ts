import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSwingComponent } from './test-swing.component';

describe('TestSwingComponent', () => {
  let component: TestSwingComponent;
  let fixture: ComponentFixture<TestSwingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSwingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSwingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
