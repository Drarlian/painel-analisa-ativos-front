import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticLayoutComponent } from './analitic-layout.component';

describe('AnaliticLayoutComponent', () => {
  let component: AnaliticLayoutComponent;
  let fixture: ComponentFixture<AnaliticLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaliticLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliticLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
