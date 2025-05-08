import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterProblemesComponent } from './consulter-problemes.component';

describe('ConsulterProblemesComponent', () => {
  let component: ConsulterProblemesComponent;
  let fixture: ComponentFixture<ConsulterProblemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsulterProblemesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterProblemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
