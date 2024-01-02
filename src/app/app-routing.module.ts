import { NgModule } from '@angular/core';
import { BookResolver } from './shared/book-resolver';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { BookStoreResolverService } from './shared/book-store-resolver';
import { MainContentComponent } from './main-content/main-content.component';
import { SalesDetailsComponent } from './sales/sales-details/sales-details.component';
import { PurchaseDetailsComponent } from './purchase/purchase-details-component/purchase-details-component.component';
import { ConfirmationPageComponent } from './sales/confirmation-page/confirmation-page.component';
// import { PurchaseInformationComponent } from './purchase/purchase-information/purchase-information.component';
// import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';
import { SalesContactInformationComponent } from './sales/sales-contact-information/sales-contact-information.component';

const appRoutes: Routes = [
    {path:'auth', component:LoginComponent},
    {path:'', redirectTo:'Home', pathMatch:'full'},
    {path:'Home', component: MainContentComponent,
    canActivate:[BookStoreResolverService], 
    resolve:[BookResolver] },
    {path:'Purchase', component: PurchaseComponent, children:[
        // {path:'contact', component: PurchaseInformationComponent},
        {path:'Details', component: PurchaseDetailsComponent},
        // {path:'confirmation', component: PurchaseConfirmationComponent}
    ]},
    {path:'Sales', component: SalesComponent, children:[
        {path:'contact', component: SalesContactInformationComponent},
        {path:'billing', component: SalesDetailsComponent},
        {path:'confirmation', component: ConfirmationPageComponent}
    ]},
]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}