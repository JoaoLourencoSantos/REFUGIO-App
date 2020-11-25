import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilColaboradorComponent } from './perfil-colaborador.component';

describe('PerfilColaboradorComponent', () => {
  let component: PerfilColaboradorComponent;
  let fixture: ComponentFixture<PerfilColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
