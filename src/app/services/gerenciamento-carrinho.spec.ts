import { TestBed } from '@angular/core/testing';

import { GerenciamentoCarrinho } from './gerenciamento-carrinho';

describe('GerenciamentoCarrinho', () => {
  let service: GerenciamentoCarrinho;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciamentoCarrinho);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
