import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColaboradorComponent } from './list-colaborador.component';

describe('ListColaboradorComponent', () => {
  let component: ListColaboradorComponent;
  let fixture: ComponentFixture<ListColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
