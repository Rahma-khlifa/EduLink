import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublierProblemeComponent } from './publier-probleme.component';

describe('PublierProblemeComponent', () => {
  let component: PublierProblemeComponent;
  let fixture: ComponentFixture<PublierProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublierProblemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublierProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
