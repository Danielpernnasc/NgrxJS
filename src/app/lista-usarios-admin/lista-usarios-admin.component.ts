import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, pipe } from 'rxjs';
import { UsuarioModel } from '../Models/UsuarioModel';
import { AppState } from '../Store/app.state';
import * as fromUsuariosSelector from '../Store/usuarios/usuarios.reducer'
@Component({
  selector: 'app-lista-usarios-admin',
  templateUrl: './lista-usarios-admin.component.html',
  styleUrls: ['./lista-usarios-admin.component.scss']
})
export class ListaUsariosAdminComponent implements OnInit {

  constructor( private store: Store<AppState>,) { }
  listaUsuarios$: Observable<UsuarioModel[]> = this.store.select(fromUsuariosSelector.getUsuariosAdministradores);
  listaUsuarios5$: Observable<UsuarioModel[]> = this.store.select(fromUsuariosSelector.getUsuariosAdministradoresPorParamentro, {perfil: 'Dona de Casa'})
  listaUsuarios: UsuarioModel[] = [];
  listaUsuarios2: UsuarioModel[] = [];
  listaUsuarios3: UsuarioModel[] = [];
  
  ngOnInit(): void {
    this.store
    .select(fromUsuariosSelector.getUsuariosAdministradores)
      .subscribe({
          next: (usuarios: UsuarioModel[]) => {
            this.listaUsuarios = usuarios.filter((filter) => (filter.perfil == 'Administrador' || filter.perfil == 'Administradora' ));
            console.log(this.listaUsuarios, 'Usuarios 2')
          }
    });

    this.store
    .select(fromUsuariosSelector.getUsuariosAdministradoresPorParamentro, {perfil: 'Empresário'})
      .subscribe({
          next: (usuarios: UsuarioModel[]) => {
            this.listaUsuarios2 = usuarios.filter((filter) => (filter.perfil == 'Empresário' ));
            console.log(this.listaUsuarios2, 'Usuarios 2')
          }
    });


    this.store
    .select(fromUsuariosSelector.getUsuariosAdministradoresPorParamentro, {perfil: 'Professora'})
      .subscribe({
          next: (usuarios: UsuarioModel[]) => {
            this.listaUsuarios3 = usuarios.filter((filter) => (filter.perfil == 'Professora' ));
            console.log(this.listaUsuarios3, 'Usuarios 3')
          }
    });
  
  }
 
}
