import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService 
{
    private elemento = document.querySelector('#theme');

    constructor() 
    {
        const url = localStorage.getItem('theme') || 'assets/css/colors/default-dark.css';
        this.elemento.setAttribute('href',url)
    }
    changeTheme(tema:string)
    {        
        const url = `assets/css/colors/${tema}.css`;
        this.elemento.setAttribute('href',url)
        localStorage.setItem('theme',url);   
        this.checkCurrentTheme()     
    }
    checkCurrentTheme(){
      const links = document.querySelectorAll('.selector');
      //console.log(links)
      links.forEach(elem =>{
        elem.classList.remove('working')
        const btnTema = elem.getAttribute('data-theme');
        const btnTemaUrl = `assets/css/colors/${btnTema}.css`
        const currentTema = this.elemento.getAttribute('href');
        if(btnTemaUrl === currentTema){
          elem.classList.add('working')
        }
      })
    }
}
