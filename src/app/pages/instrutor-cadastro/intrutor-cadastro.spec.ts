import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrutorCadastro } from './intrutor-cadastro';

describe('IntrutorCadastro', () => {
  let component: IntrutorCadastro;
  let fixture: ComponentFixture<IntrutorCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntrutorCadastro],
    }).compileComponents();

    fixture = TestBed.createComponent(IntrutorCadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
