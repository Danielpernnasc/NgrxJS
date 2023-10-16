import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsariosAdminComponent } from './lista-usarios-admin.component';

describe('ListaUsariosAdminComponent', () => {
  let component: ListaUsariosAdminComponent;
  let fixture: ComponentFixture<ListaUsariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaUsariosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUsariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
