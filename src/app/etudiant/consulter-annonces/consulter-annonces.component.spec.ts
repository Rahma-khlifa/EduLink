import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterAnnoncesComponent } from './consulter-annonces.component';

describe('ConsulterAnnoncesComponent', () => {
  let component: ConsulterAnnoncesComponent;
  let fixture: ComponentFixture<ConsulterAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsulterAnnoncesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
