import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { MapComponent } from './map/map.component';
import { CartComponent } from 'src/app/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/head',
    pathMatch: 'full'
  },
  {
    path: 'head',
    component: HeaderComponent,
  },{
  
    path: 'map',
    component: MapComponent,

},
{
  
  path: 'cart',
  component: CartComponent,

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
