import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.getUsuarios()
    this.getUsuarios().then( usuarios =>{
      console.log(usuarios)
    })
    /*const promera = new Promise((resolve,reject)=>{

      if(false)
        resolve('hola mundo')
      else
        reject('algo salio mal')

    })
    promera.then((mensaje)=>{
      console.log(mensaje)
    })
    .catch(err => console.log(err))
    
    console.log('fin init')*/
  }
  getUsuarios(){

    const promesa = new Promise(resolve =>{
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => resolve(body.data))
    });
    return promesa
    /*fetch('https://reqres.in/api/users')
        .then( respuesa =>{
          respuesa.json().then(body => console.log(respuesa))
          
        })*/
        /*fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => console.log(body.data))*/
          //respuesa.json().then(body => console.log(body))
          
        
  }

}
