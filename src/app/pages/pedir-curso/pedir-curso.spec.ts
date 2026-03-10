import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirCurso } from './pedir-curso';

describe('PedirCurso', () => {
  let component: PedirCurso;
  let fixture: ComponentFixture<PedirCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedirCurso],
    }).compileComponents();

    fixture = TestBed.createComponent(PedirCurso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
