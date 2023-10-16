import { Action, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { UsuarioModel } from "src/app/Models/UsuarioModel";
import * as fromUsuariosAction from "../usuarios/usuarios.actions"


export interface UsuariosState{
    usuarios: UsuarioModel[];
    usuario: UsuarioModel | null;
    error: string | '';
}

export const initialState: UsuariosState = {
    usuarios: [],
    usuario: null,
    error: ''

}

const _usuariosReducer =  createReducer(
    initialState,
    //LoadUsuarios
    on(fromUsuariosAction.LoadUsuariosSuccess,(state,{ playload }) => ({...state, usuarios: playload, error: ''})),
    on(fromUsuariosAction.LoadUsuariosFail,(state,{ error}) => ({...state, error: error})),
    //LoadUsuario
    on(fromUsuariosAction.LoadUsuarioSuccess,(state,{ playload }) => ({...state, usuario: playload, error: ''})),
    on(fromUsuariosAction.LoadUsuarioFail,(state,{ error}) => ({...state, error: error})),
    //LoadCreate
    on(fromUsuariosAction.CreateUsuarioSuccess,(state,{ playload }) => 
    ({...state, usuarios: [...state.usuarios, playload], error: ''})),
    on(fromUsuariosAction.CreateUsuarioFail,(state,{ error}) => ({...state, error: error})),
    //LoadUpdate
    on(fromUsuariosAction.UpdateUsuarioSuccess,(state,{ playload }) => ({
        ...state,
        usuarios: [...state.usuarios].map((row) => {
            if(row.id  == playload.id){
                return playload;
            }else {
                return row;
            }
        }),
        error: ''
    })),
    on(fromUsuariosAction.UpdateUsuarioFail,(state,{ error}) => ({...state, error: error})),
    //LoadDelete
    on(fromUsuariosAction.DeleteUsuarioSuccess,(state,{ playload }) => ({
        ...state, usuarios: [...state.usuarios].filter((filter) => filter.id != playload)})),
    on(fromUsuariosAction.DeleteUsuarioFail,(state,{ error}) => ({...state, error: error})),
) 

export function usuariosReducer(state = initialState, action: Action) {
    return _usuariosReducer(state, action);
}

const getUsuariosFeatureState = createFeatureSelector<UsuariosState>('usuarios')

    export const getUsuarios = createSelector(
        getUsuariosFeatureState, 
        (state: UsuariosState) => state.usuarios
    )

    export const getUsuario = createSelector(
        getUsuariosFeatureState, 
        (state: UsuariosState) => state.usuario
    )

    export const getUsuarioErro = createSelector(
        getUsuariosFeatureState, 
        (state: UsuariosState) => state.error
    )

    export const getUsuariosAdministradores = createSelector(
        getUsuariosFeatureState, 
        (state: UsuariosState) => state.usuarios.filter((filter) => filter.perfil == 'Administrador' || filter.perfil == 'Administradora')
    )

    export const getUsuariosAdministradoresPorParamentro = createSelector(
        getUsuariosFeatureState, 
        (state: UsuariosState, props:{perfil: string}) => state.usuarios.filter((filter) => filter.perfil == props.perfil)
    )

    export const getUsuariosIdadeMaiorde50 = createSelector(
        getUsuariosFeatureState, 
        (state: UsuariosState) => state.usuarios.filter((filter) => filter.idade >= 50)
    )