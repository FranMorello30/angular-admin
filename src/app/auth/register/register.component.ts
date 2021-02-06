import Swal from 'sweetalert2'

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSudmitted = false
  public registreForm = this.fb.group({
    nombre:['fran',[Validators.required]],
    email:['test100@gmail.com',[Validators.email,Validators.required]],
    password:['1',Validators.required],
    password2:['1',Validators.required],
    terminos:[true,Validators.required],
  },{
    validators:this.passwordsIguales
  });

  constructor(private router:Router,
              private fb:FormBuilder,
              private UsuarioService:UsuarioService) { }

  ngOnInit(): void {
  }
  irLogin()
  {
      this.router.navigateByUrl('login')
  }
  crearUsuario()
  {
    this.formSudmitted = true;
    console.log(this.registreForm.value)

    if(this.registreForm.invalid)
      return;

      //hacer posteo
      this.UsuarioService.crearUsuario(this.registreForm.value)
          .subscribe( resp =>{
            console.log('usuario creado')
            console.log(resp)
            this.router.navigateByUrl('/')
          },(err) => {
            // error
            Swal.fire({
              icon:'error',
              title:'Error',
              titleText:err.error.msg
            })
          })
  }
  campoNoValido(campo:string):boolean{
    
    if(this.registreForm.get(campo).invalid && this.formSudmitted){
      return true;
    }else{
      return false
    }       
  }
  aceptaTerminos()
  {
    return !this.registreForm.get('terminos').value && this.formSudmitted
  }
  contrasenasNoValidas()
  {
    const pass1 = this.registreForm.get('password').value;
    const pass2 = this.registreForm.get('password2').value;

    if((pass1 !== pass2) && this.formSudmitted){
      return true
    }else{
      return false
    }
  }
  passwordsIgualesProfe(pass1:string,pass2:string)
  {
      return (formGroup: FormGroup) =>{
        const pass1Control = formGroup.get(pass1);
        const pass2Control = formGroup.get(pass2);
        if(pass1Control.value === pass2Control.value){
          pass2Control.setErrors(null)
        }else{
          pass2Control.setErrors({noEsIgual:true})
        }
      }
  }
  passwordsIguales(control: AbstractControl): ValidationErrors | null {
    const pass1 = control.get('password')?.value;
    const pass2 = control.get('password2')?.value;
    if (pass1 !== pass2) {
        control.get(pass2)?.setErrors({ noIguales: true });
        return { noIguales: true };
    }
    return null;
}
}
