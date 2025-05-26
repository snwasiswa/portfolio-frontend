import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoscheckingComponent } from './whoschecking.component';

describe('WhoscheckingComponent', () => {
  let component: WhoscheckingComponent;
  let fixture: ComponentFixture<WhoscheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoscheckingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoscheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
