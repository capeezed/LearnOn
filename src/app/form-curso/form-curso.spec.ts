import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCurso } from './form-curso';

describe('FormCurso', () => {
  let component: FormCurso;
  let fixture: ComponentFixture<FormCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
