import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
//import { UsuariosService } from "src/app/Repositorios/UsuarioService";
import { UsersService  } from "../../Repositorios/users.service"
import * as fromUsuariosAction from "./usuarios.actions";

@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions, private usariosService: UsersService) {

    }

    loadUsuarios$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIOS),
                exhaustMap(() => this.usariosService.getUsuarios()

                    .pipe(
                        map(playload =>
                            fromUsuariosAction.LoadUsuariosSuccess({ playload }),
                            catchError(error => of(fromUsuariosAction.LoadUsuariosFail({ error })))
                        )
                    )
                )
            )


    )

    loadUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIO),
                exhaustMap((record: any) => this.usariosService.getUsuario(record.playload)

                    .pipe(
                        map(playload =>
                            fromUsuariosAction.LoadUsuarioSuccess({ playload }),
                            catchError(error => of(fromUsuariosAction.LoadUsuarioFail({ error })))
                        )
                    )
                )
            )
    )

    createUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.CREATE_USUARIO),
                exhaustMap((record: any) => this.usariosService.addUsuario(record.playload)

                    .pipe(
                        map(playload =>
                            fromUsuariosAction.CreateUsuarioSuccess({ playload }),
                            catchError(error => of(fromUsuariosAction.CreateUsuarioFail({ error })))
                        )
                    )
                )
            )
    )

    updateUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.UPDATE_USUARIO),
                exhaustMap((record: any) => this.usariosService.updateUsuario(record.playload)

                    .pipe(
                        map(playload =>
                            fromUsuariosAction.UpdateUsuarioSuccess({ playload }),
                            catchError(error => of(fromUsuariosAction.UpdateUsuarioFail({ error })))
                        )
                    )
                )
            )
    )

    deleteUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.DELETE_USUARIO),
                exhaustMap((record: any) => this.usariosService.deleteUsuario(record.playload)

                    .pipe(
                        map(() =>
                            fromUsuariosAction.DeleteUsuarioSuccess({ playload: record.playload }),
                            catchError(error => of(fromUsuariosAction.DeleteUsuarioFail({ error })))
                        )
                    )
                )
            )
    )
}


