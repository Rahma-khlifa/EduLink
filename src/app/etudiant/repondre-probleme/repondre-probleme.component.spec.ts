import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepondreProblemeComponent } from './repondre-probleme.component';

describe('RepondreProblemeComponent', () => {
  let component: RepondreProblemeComponent;
  let fixture: ComponentFixture<RepondreProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepondreProblemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepondreProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
