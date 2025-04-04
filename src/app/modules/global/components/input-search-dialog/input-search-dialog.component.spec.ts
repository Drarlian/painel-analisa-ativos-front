import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchDialogComponent } from './input-search-dialog.component';

describe('InputSearchDialogComponent', () => {
  let component: InputSearchDialogComponent;
  let fixture: ComponentFixture<InputSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
