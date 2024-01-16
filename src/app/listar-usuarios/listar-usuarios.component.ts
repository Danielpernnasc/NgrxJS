import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';



import { UsuarioModel } from '../Models/UsuarioModel';
//import { UsersService } from '../Repositorios/users.service';
import { AppState } from '../Store/app.state';
import * as fromUsuariosAction from '../Store/usuarios/usuarios.actions' // Já o Action precisa importar do action
import * as fromUsuariosSelector from '../Store/usuarios/usuarios.reducer' // A Seleção fromUsuariosSelector nome vc inventa na hora



@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})


export class ListarUsuariosComponent implements OnInit {
  //Listausuarios: UsuarioModel[] = [];
  listaUsuarios$: Observable<UsuarioModel[]> = this.store.select(fromUsuariosSelector.getUsuarios);
  Usuario$: Observable<UsuarioModel | null> = this.store.select(fromUsuariosSelector.getUsuario);
  idUsuarios = {} as UsuarioModel;
  showButton: boolean = false;
  inputDesabilitado: boolean = true;
  // updateForm: FormGroup = new FormGroup;
  contactForm!: FormGroup;


  constructor(
   
   /** Não se utilizar mais devido estar no effect */ //private usuarioService: UsersService
   private store: Store<AppState>,
   private formBuilder: FormBuilder,

    ) {
       
 
      this.contactForm = this.formBuilder.group({
        id: ['', Validators.required],  
        nome: ['', Validators.required],
        idade: ['', Validators.required],
        perfil: ['', Validators.required]
      });
    
     
     }


    // model: UsuarioModel = {id: undefined, nome: '', idade: undefined, perfil: ''};

  ngOnInit(): void {
    this.buscarUsuarios();
    const inputid = document.getElementById("id") as HTMLInputElement;

    inputid.addEventListener("input", () => {
      inputid.value = inputid.value.replace(/[^0-9]/g, '');
    })

    const inputidade = document.getElementById("idade") as HTMLInputElement;

    inputidade.addEventListener("input", () => {
      inputidade.value = inputidade.value.replace(/[^0-9]/g, '');
    })
    //this.busqueUsuario();
    // const idProcurado = 2
    // const usuarioEncontrado = this.idUsuarios.find(usuario => usuario.id === idProcurado);
    // if(usuarioEncontrado){
    //   console.log('Usuário encontrado:', usuarioEncontrado);
    // } else {
    //   console.log('Usuário não encontrado:', usuarioEncontrado);
    // }

    
  }




  buscarUsuarios(){
    this.store.dispatch(fromUsuariosAction.LoadUsuarios());
    // this.usuariosService.getUsuarios().subscribe((usuarios: UsuarioModel[]) => {
    //   this.Listausuarios = usuarios;
      
    // })
    // this.usuarioService.getUsuarios().subscribe({
    //   next: (usuarios: UsuarioModel[]) => {
    //     this.Listausuarios = usuarios;
    //     console.log(this.Listausuarios, "os usuarios aqui")
    //   },
    //   error: (error) => {
    //     error
    //   }, 
 
    // })
  }



 

 

  editarUsuario(id: number){
      // this.usuariosService.updateUsuario().subscribe({
      //   next: (data: UsuarioModel[]) => {
      //     console.log(data, 'Mudar dados' );
      //   }
      // })
  
        this.store.dispatch(fromUsuariosAction.LoadUsuario({playload: id}));
        console.log('aqui')
      
      
  }

  excluirUsuario(id: number){
      // this.usuariosService.updateUsuario().subscribe({
      //   next: (data: UsuarioModel[]) => {
      //     console.log(data, 'Mudar dados' );
      //   }
      // })
  
        this.store.dispatch(fromUsuariosAction.DeleteUsuario({playload: id}));
        console.log('aqui')
      
      
  }

  alterarUsuario(){
    if(this.idUsuarios.id !== 0) {
      //cadastra
      console.log(this.idUsuarios, "cadastrar");
      this.store.dispatch(fromUsuariosAction.UpdateUsuario({playload: this.idUsuarios}))
      this.showButton = true;
    } else {
      //atualizar
      console.log(this.idUsuarios, "atualizar");

    }

  }

  fecharAtulizar() {
    location.reload();
  }






}
