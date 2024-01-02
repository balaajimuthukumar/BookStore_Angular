import { NgModule } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BrowserModule } from '@angular/platform-browser';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { SalesComponent } from './sales/sales.component';
import { LoginComponent } from './login/login.component';
import { RequestInterceptor } from './request-interceptor';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { LeftMenuComponent } from './core/left-menu/left-menu.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SalesDetailsComponent } from './sales/sales-details/sales-details.component';
import { ConfirmationPageComponent } from './sales/confirmation-page/confirmation-page.component';
import { PurchaseDetailsComponent } from './purchase/purchase-details-component/purchase-details-component.component';
// import { PurchaseInformationComponent } from './purchase/purchase-information/purchase-information.component';
// import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';
import { SalesContactInformationComponent } from './sales/sales-contact-information/sales-contact-information.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SalesComponent,
    HeaderComponent,
    FooterComponent,
    PurchaseComponent,
    LeftMenuComponent,
    NavigationComponent,
    MainContentComponent,
    SalesDetailsComponent,
    PurchaseDetailsComponent,
    ConfirmationPageComponent,
    // PurchaseInformationComponent,
    // PurchaseConfirmationComponent,
    SalesContactInformationComponent,    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    StepsModule,
    TableModule,
    ImageModule,
    ButtonModule,
    SidebarModule,
    BrowserModule,
    ToolbarModule,
    TabViewModule,
    MenubarModule,
    PanelMenuModule,
    InputTextModule,
    InputNumberModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollPanelModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:RequestInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
