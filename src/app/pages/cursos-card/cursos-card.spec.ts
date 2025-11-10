import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosCard } from './cursos-card';

describe('CursosCard', () => {
  let component: CursosCard;
  let fixture: ComponentFixture<CursosCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursosCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
