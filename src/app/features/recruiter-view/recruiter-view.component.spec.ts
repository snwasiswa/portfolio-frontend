import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterViewComponent } from './recruiter-view.component';

describe('RecruiterViewComponent', () => {
  let component: RecruiterViewComponent;
  let fixture: ComponentFixture<RecruiterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
