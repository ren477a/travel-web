import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PaymentModule } from './payments/payment/payment.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

import { ValidateService } from './services/validate.service';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';
import { ToursService } from './services/tours.service';
import { TourComponent } from './components/tour/tour.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BrowseComponent } from './components/browse/browse.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';
import { TransactionService } from './services/transaction.service';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagetoursComponent } from './components/managetours/managetours.component';
import { RegisteragencyComponent } from './components/registeragency/registeragency.component';
import { LoginagencyComponent } from './components/loginagency/loginagency.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'browse', component: BrowseComponent },
  { path: 'useraccount', component: UseraccountComponent, canActivate: [GuardService], data: { expectedRole: 'user' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService], data: { expectedRole: 'agency' } },
  { path: 'manage', component: ManagetoursComponent, canActivate: [GuardService], data: { expectedRole: 'agency' } },
  { path: 'register', component: RegisterComponent },
  { path: 'register/agency', component: RegisteragencyComponent },
  { path: 'confirmation', component: ConfirmationComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/agency', component: LoginagencyComponent },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
  { path: 'tour/:id', component: TourComponent, pathMatch: 'full' },
  { path: 'checkout', component: CheckoutComponent, canActivate: [GuardService], data: { expectedRole: 'user' }},
  { path: '404', component: PagenotfoundComponent },
  { path: '**', component: PagenotfoundComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    PagenotfoundComponent,
    TourComponent,
    CheckoutComponent,
    BrowseComponent,
    UseraccountComponent,
    ConfirmationComponent,
    DashboardComponent,
    ManagetoursComponent,
    RegisteragencyComponent,
    LoginagencyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    PaymentModule
  ],
  providers: [
    ValidateService,
    AuthService,
    ToursService,
    TransactionService,
    GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
