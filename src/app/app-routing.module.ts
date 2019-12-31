import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductDetailGuard } from './products/product-detail/product-detail.guard';
import { CustomerComponent } from './customer/customer.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductEditGuard } from './products/product-edit/product-edit.guard';

const routes: Routes = [
  {path:'products', component :ProductListComponent},
  {path:'signup', component :CustomerComponent},
  {path:'products/:id', canActivate: [ProductDetailGuard], component :ProductDetailComponent},
  {path:'products/:id/edit',  canDeactivate: [ProductEditGuard], component :ProductEditComponent},
  {path:'welcome', component :WelcomeComponent},
  {path:'', redirectTo: 'welcome',pathMatch : 'full'},
  {path:'*', redirectTo: 'welcome',pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
