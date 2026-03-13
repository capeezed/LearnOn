import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrutorLogin } from './instrutor-login';

describe('InstrutorLogin', () => {
  let component: InstrutorLogin;
  let fixture: ComponentFixture<InstrutorLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrutorLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrutorLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
