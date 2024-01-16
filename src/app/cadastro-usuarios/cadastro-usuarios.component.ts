  import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsuarioModel } from '../Models/UsuarioModel';
import { AppState } from '../Store/app.state';
import * as fromUsuariosAction from '../Store/usuarios/usuarios.actions';


@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {


  model ={} as UsuarioModel;
  

  formulario!: FormGroup;

  constructor(

    /* não sera mais preciso usar o servico com o store  aqui*/ //private usuarioService: UsersService

    /*Agora o serviço vem do Store da Action, Reduce e Effect*/
    private store: Store<AppState>,
    private el: ElementRef,
    private formBuilder: FormBuilder,

    ) {
      this.formulario = this.formBuilder.group({
        id: ['', Validators.required],  
          nome: ['', Validators.required],
          idade: ['', Validators.required],
          perfil: ['', Validators.required]
      });
     }

  ngOnInit(): void {
  
    const inputid = document.getElementById("id") as HTMLInputElement;

    inputid.addEventListener("input", () => {
      inputid.value = inputid.value.replace(/[^0-9]/g, '');
    })

    const inputidade = document.getElementById("idade") as HTMLInputElement;

    inputidade.addEventListener("input", () => {
      inputidade.value = inputidade.value.replace(/[^0-9]/g, '');
    })
  }



addUsuario() {
    
  if (this.model.id !== 0) {
  
   


    console.log('cadastra',this.model);
    // cadastra
    //this.usuarioService.addUsuario(this.model).subscribe();
    this.store.dispatch(fromUsuariosAction.CreateUsuario({playload:this.model}));
    this.reloadAndScroll();
  

  }
  
}

reloadAndScroll() {
  window.location.reload();

  setTimeout(() => {
    const elementoAncora = this.el.nativeElement.querySelector("#ancora");
    const posicaoAncora = elementoAncora.offsetTop;

    window.scrollTo({
      top: posicaoAncora,
      behavior: 'smooth'
    })
  }, 100);
}
}
