import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefinicaoSenha } from './redefinicao-senha';

describe('RedefinicaoSenha', () => {
  let component: RedefinicaoSenha;
  let fixture: ComponentFixture<RedefinicaoSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedefinicaoSenha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedefinicaoSenha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
