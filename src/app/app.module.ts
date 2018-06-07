import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { LoginComponent } from './login/login.component';
import { GlobalService } from './GlobalService';
import { AuthGuard } from './auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { SignupHomeComponent } from './signup-home/signup-home.component';
import { HomeComponent } from './home/home.component'
import { ResellerComponent } from './resellerHome/resellerHome.component';
import { UpdatePasswordComponent } from './updatePassword/updatePassword.component';
import { ListicoComponent } from './list-ico/list-ico.component';
import { Error404Component } from './dashboard/error404/error404.component';
import { rootComponent } from './dashboard/error404/error404.component';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { HomeCrowdsaleComponent } from './home-crowdsale/home-crowdsale.component';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ScrollToModule} from 'ng2-scroll-to';
import { UndermaintenanceComponent } from './undermaintenance/undermaintenance.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MessageService } from './message.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Safe,TruncatePipe} from './Pipes/pipe';
import { RecaptchaModule ,RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
declare let ga: Function;
import { SharepointsComponent } from './sharepoints/sharepoints.component';
import { ShareButtonModule } from '@ngx-share/button';
let providers ={
    // "google": {
    //            "clientId": "230815267664643",
    //             "secretId" : "2c81eac86dca6cd36f4a02ffa2ccaac7"
    //            },
    // "linkedin": 
    //            {
    //                "clientId": "LINKEDIN_CLIENT_ID"
    //            },
    "facebook":
               {
                 "clientId": "230815267664643",
                 "secretId" : "2c81eac86dca6cd36f4a02ffa2ccaac7",
                 "apiVersion": 'v2.10'
              }
    // "twitter":
    //            {
    //                 "clientId": "TWITTER_CLIENT_ID",
    //                   "apiVersion": "<version>" 
    //           }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    SignupHomeComponent,
    UpdatePasswordComponent,
    rootComponent,
    Error404Component,
    HomeCrowdsaleComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    ListicoComponent,
    ResellerComponent,
    UndermaintenanceComponent,
    HeaderComponent,
    FooterComponent,   
    SharepointsComponent, 
    Safe,
    TruncatePipe
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(AppRoutes,{useHash:false}),
    Ng4LoadingSpinnerModule,
    Angular2SocialLoginModule,
    SidebarModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    HttpModule,
    HttpClientModule,
    ScrollToModule,
    BrowserModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    ShareButtonModule.forRoot()

  ],

  providers: [
             AuthGuard,   
             ToasterService,
             GlobalService, 
             AuthGuard,
             Ng4LoadingSpinnerService,
             MessageService,
             // below line is use for add # in url
             {
                 provide:
                 LocationStrategy,
                 useClass: HashLocationStrategy
             },

              {
             provide: RECAPTCHA_SETTINGS,
              useValue: { 
                siteKey: '6LdAm04UAAAAABRwz2yNS5P2yLKpxxL47nDqN_sT',
                          } 
             },

             DatePipe,Safe,TruncatePipe],
  bootstrap: [AppComponent],
})

export class AppModule { 
  constructor(){}
}

Angular2SocialLoginModule.loadProvidersScripts(providers);
