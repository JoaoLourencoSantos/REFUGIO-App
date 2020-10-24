import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspeccaoComponent } from './prospeccao.component';

describe('ProspeccaoComponent', () => {
  let component: ProspeccaoComponent;
  let fixture: ComponentFixture<ProspeccaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspeccaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspeccaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
