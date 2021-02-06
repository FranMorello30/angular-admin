import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interface';
import { UsuarioService } from '../../services/usuario.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2:any;

  public loginForm = this.fb.group({
 
    email:[ localStorage.getItem('email') || '',[Validators.email,Validators.required]],
    password:['',Validators.required],
    remenber:[false],
    
  });  

  constructor(private router:Router,
              private fb:FormBuilder,
              private UsuarioService:UsuarioService,
              private ngZone:NgZone) { 
 
  }

  ngOnInit(): void {
    this.renderButton()
  }
  irRegistro(): void
  {
    this.router.navigate(['/registre']);
  }
  login()
  {

    this.UsuarioService.loginUsuario(this.loginForm.value)
        .subscribe(resp =>{
          if(this.loginForm.get('remenber').value)
          {
              localStorage.setItem('email',this.loginForm.get('email').value)
          }else{
              localStorage.removeItem('email')
          }

          this.router.navigateByUrl('/')
        },(err)=>{
          Swal.fire({
            icon:'error',
            title:'Error',
            titleText:err.error.msg
          })
        })

   
  }
  
  // 
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',     
    });
    this.startApp()
  }
  async startApp() {

      await this.UsuarioService.googleInit()
      this.auth2 = this.UsuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));
 
  };
  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token
           // console.log('token google',id_token)
            this.UsuarioService.loginGoogle(id_token).subscribe(resp =>{
               
              this.ngZone.run( () =>{
                  //mover al dashbor
                  this.router.navigateByUrl('/')
              })
             
            })
           
            
        }, (error) => {
            console.log(JSON.stringify(error, undefined, 2));
        });
  }
}
