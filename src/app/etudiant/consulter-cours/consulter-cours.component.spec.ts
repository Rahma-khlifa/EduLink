import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCoursComponent } from './consulter-cours.component';

describe('ConsulterCoursComponent', () => {
  let component: ConsulterCoursComponent;
  let fixture: ComponentFixture<ConsulterCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsulterCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
