import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, Observable } from 'rxjs';
import { UsuarioModel } from '../Models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  user = 'http://localhost:3000/usuarios';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  getUsuarios(): Observable<UsuarioModel[]> {
  
    return this.http.get<UsuarioModel[]>(`${this.user}`).pipe(
      map( res => res)

    );
    
  }

  getUsuario(id:number): Observable<UsuarioModel>{
    
    return this.http.get<UsuarioModel>(`${this.user}/` + id).pipe(
      map((res: UsuarioModel) =>{
        return res || {}
      }),
      catchError(this.handleError)
    );
  }

  addUsuario(record: UsuarioModel){

    return this.http.post<UsuarioModel>(`${this.user}`,JSON.stringify(record), this.httpOptions).pipe(
      map((res: UsuarioModel) => {
        return res 
      }),
     
      catchError(this.handleError)
      
    );
  }

  updateUsuario(record: UsuarioModel) {

   
    return this.http.put<UsuarioModel>(`${this.user}/` + record.id, JSON.stringify(record), this.httpOptions).pipe(
      map((res) => {
        return res
      }),
      catchError(this.handleError)
    );
}




  deleteUsuario(id:number){
    return this.http.put<UsuarioModel>(`${this.user}/${id}`, this.httpOptions).pipe(
      map((res) => {
        return res
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
