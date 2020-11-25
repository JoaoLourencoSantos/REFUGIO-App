import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEmpresaComponent } from './perfil-empresa.component';

describe('PerfilEmpresaComponent', () => {
  let component: PerfilEmpresaComponent;
  let fixture: ComponentFixture<PerfilEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
