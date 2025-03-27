import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivesListComponent } from './actives-list.component';

describe('ActivesListComponent', () => {
  let component: ActivesListComponent;
  let fixture: ComponentFixture<ActivesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
