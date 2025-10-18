import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosPagina } from './cursos-pagina';

describe('CursosPagina', () => {
  let component: CursosPagina;
  let fixture: ComponentFixture<CursosPagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursosPagina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosPagina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
