import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeColaboradorComponent } from './home-colaborador.component';

describe('HomeColaboradorComponent', () => {
  let component: HomeColaboradorComponent;
  let fixture: ComponentFixture<HomeColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
