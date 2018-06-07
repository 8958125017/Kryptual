import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharepointsComponent } from './sharepoints.component';

describe('SharepointsComponent', () => {
  let component: SharepointsComponent;
  let fixture: ComponentFixture<SharepointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharepointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharepointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
