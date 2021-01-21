import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//Modulos Rutas Hijas
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

//Componentes Rutas Principales
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




const routes : Routes = [
  
  //path:/dashboard PagesRouting
  //path /auth AuthRouting
  {path: '',pathMatch:'full',redirectTo:'/dashboard'},
  {path: '**',component:NopagefoundComponent},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
