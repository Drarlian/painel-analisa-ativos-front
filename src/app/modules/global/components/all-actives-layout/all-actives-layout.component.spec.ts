import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActivesLayoutComponent } from './all-actives-layout.component';

describe('AllActivesLayoutComponent', () => {
  let component: AllActivesLayoutComponent;
  let fixture: ComponentFixture<AllActivesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllActivesLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllActivesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
