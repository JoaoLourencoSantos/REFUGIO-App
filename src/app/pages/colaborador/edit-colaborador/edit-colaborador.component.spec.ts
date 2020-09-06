import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColaboradorComponent } from './edit-colaborador.component';

describe('EditColaboradorComponent', () => {
  let component: EditColaboradorComponent;
  let fixture: ComponentFixture<EditColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
