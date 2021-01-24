import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';
import { retry,take,map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit,OnDestroy {

  public intarvalSubs:Subscription
  constructor() {

    /*this.retornaObservable().pipe(
    retry(1)
  ).subscribe(
    valor => console.log('sub',valor),
    error => console.error('error',error),
    () =>console.info('obser terminado')
  )*/
  this.intarvalSubs = this.retornaInterval()
      .subscribe(console.log)
   }
  ngOnDestroy(): void {
    this.intarvalSubs.unsubscribe();
  }

  ngOnInit(): void {

      
  }
  retornaInterval():Observable<number>
  {
    return interval(500)
    .pipe(
        take(10),
        map(valor =>{
          return valor + 1
        }),
        filter( valor => (valor % 2 === 0) ? true : false),
        
      )
     //intervalo$
  }




  retornaObservable(): Observable<number>{
      let i = -1

      const obs$ = new Observable<number>(observer =>{
      
      const intervalo =  setInterval(()=>{
          i++
          observer.next(i)

          if( i=== 4){
          clearInterval(intervalo)
          observer.complete()
          }
            // cuando da un error se termina el observable
          if(i === 2){
           // i = 0
            observer.error('i llego al 2')
          }

        },1000)
    });
    return obs$
  }

}
