import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalViewComponent } from './universal-view.component';

describe('UniversalViewComponent', () => {
  let component: UniversalViewComponent;
  let fixture: ComponentFixture<UniversalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversalViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
