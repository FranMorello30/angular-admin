import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';



const base_url = environment.base_url;
declare const gapi : any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    public auth2:any
  constructor(private _http:HttpClient,
              private router:Router,
              private ngZone:NgZone) {
                this.googleInit()
               }

  googleInit(){


    return new Promise<void>( resolve =>{

      gapi.load('auth2', () => {        
        this.auth2 = gapi.auth2.init({
          client_id: '31471681027-gsms7lnt7l5fb3k23ccq6dfav84uft7n.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',        
        });
        resolve();
      });  
      
    })

      
  }


  logout()
  {
    localStorage.removeItem('token');
    

    this.auth2.signOut().then( () => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login')
      })
      
    });
  }
  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this._http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap( (resp:any) =>{
        localStorage.setItem('token',resp.token)
      }),
      map( resp => true),
      catchError( error => of(false))
    )
  }

  crearUsuario(formData:RegisterForm){
    console.log('servicio crear usuario')
    
    return this._http.post(`${base_url}/usuarios`,formData)
                      .pipe(
                        tap( (resp:any) =>{
                          localStorage.setItem('token',resp.token)
                        })
                     )
  }
  loginUsuario(formData:LoginForm)
  {
    return this._http.post(`${base_url}/login`,formData)
                     .pipe(
                        tap( (resp:any) =>{
                          localStorage.setItem('token',resp.token)
                        })
                     )
  }
  loginGoogle(token)
  {
    return this._http.post(`${base_url}/login/google`,{token})
                     .pipe(
                        tap( (resp:any) =>{
                          localStorage.setItem('token',resp.token2)
                        })
                     )
  }
}
