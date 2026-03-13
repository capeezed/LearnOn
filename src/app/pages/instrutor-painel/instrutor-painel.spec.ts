import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrutorPainel } from './instrutor-painel';

describe('InstrutorPainel', () => {
  let component: InstrutorPainel;
  let fixture: ComponentFixture<InstrutorPainel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrutorPainel],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrutorPainel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
