import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit,OnDestroy {

  public titulo:string
  public tituloSub$ : Subscription;

  constructor(private route:Router) { 

    this.tituloSub$ = this.getParametros()
                          .subscribe( ({titulo}) =>{
                              this.titulo = titulo
                              document.title = `Admin - ${this.titulo}`
                          })
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe()
  }

  ngOnInit(): void {
  }

  getParametros()
  {
    return this.route.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data)
    );
    
  }
}
