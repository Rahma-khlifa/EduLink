import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurHomeComponent } from './professeur-home.component';

describe('ProfesseurHomeComponent', () => {
  let component: ProfesseurHomeComponent;
  let fixture: ComponentFixture<ProfesseurHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfesseurHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesseurHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
