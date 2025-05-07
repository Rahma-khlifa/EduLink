import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantHomeComponent } from './etudiant-home.component';

describe('EtudiantHomeComponent', () => {
  let component: EtudiantHomeComponent;
  let fixture: ComponentFixture<EtudiantHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtudiantHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
