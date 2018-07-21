  import { ModuleWithProviders } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { SidebarComponent } from './sidebar.component';
  import { DashboardComponent } from './../dashboard/dashboard.component';
  import { ViewUserComponent } from './../dashboard/UserList/view-user/view-user.component';
  import { MyProfileComponent } from './../dashboard/UserList/my-profile/my-profile.component';
  import { SettingComponent } from './../dashboard/UserList/setting/setting.component';
  import { HelpComponent } from './../dashboard/UserList/help/help.component';
  import { LoginComponent } from '../login/login.component';
  import { InvestIcoComponent } from './../dashboard/UserList/investIco/investIco.component';
  import { childComponent } from './../dashboard/error404/error404.component'; 
  import { AuthGuard } from './../auth-guard.service';
  import { SendtokenComponent } from './../dashboard/UserList/sendtoken/sendtoken.component';
  import { ReferComponent } from './../dashboard/UserList/refer/refer.component';
  import { GenerateIcoComponent } from './../dashboard/UserList/generate-ico/generate-ico.component';
  import { CrowdsaleComponent } from './../dashboard/UserList/crowdsale/crowdsale.component';
  import { InvestComponent } from './../dashboard/UserList/invest/invest.component';
  import { MerchandiseComponent } from '../dashboard/UserList/merchandise/merchandise.component';
  import { ProductDetailComponent } from '../dashboard/UserList/product-detail/product-detail.component';
  import { InvesterReferComponent } from './../dashboard/UserList/invester-refer/invester-refer.component';
  import { AdminDashboardComponent } from '../dashboard/admin_User/admin_Dashboard/admin_Dashboard.component';
import { ExchangeadminComponent } from '../dashboard/admin_User/exchangeadmin/exchangeadmin.component';
import { UserdetailsComponent } from '../dashboard/admin_User/exchangeadmin/userdetails/userdetails.component';
import { FeemanagementComponent } from '../dashboard/admin_User/exchangeadmin/feemanagement/feemanagement.component';
import { MarketdetailComponent } from '../dashboard/admin_User/exchangeadmin/marketdetail/marketdetail.component';
import { ExchangesettingComponent } from '../dashboard/admin_User/exchangeadmin/exchangesetting/exchangesetting.component';
import { CurrencylistComponent } from '../dashboard/admin_User/exchangeadmin/currencylist/currencylist.component';
import { FundmanagementComponent } from '../dashboard/admin_User/exchangeadmin/fundmanagement/fundmanagement.component';
import { ReportsComponent } from '../dashboard/admin_User/exchangeadmin/reports/reports.component';

  import { ExchangeComponent } from './../exchange/exchange.component';
  const routes: Routes = [


    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], children:
    [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'view-user', component: ViewUserComponent,canActivate:[AuthGuard] },
    { path: 'my-profile', component: MyProfileComponent,canActivate:[AuthGuard] },
    { path: 'setting', component: SettingComponent ,canActivate:[AuthGuard]},
    { path: 'help', component: HelpComponent,canActivate:[AuthGuard] },
    { path: 'investIco', component: InvestIcoComponent,canActivate:[AuthGuard] },
    { path: 'sendtoken', component: SendtokenComponent,canActivate:[AuthGuard] },
    { path: 'refer', component: ReferComponent,canActivate:[AuthGuard] },    
    { path: 'generateIco', component: GenerateIcoComponent,canActivate:[AuthGuard] },
    { path: 'crowdsale', component: CrowdsaleComponent,canActivate:[AuthGuard] },
    { path: 'invest', component: InvestComponent,canActivate:[AuthGuard] },
    { path: 'merchandise', component: MerchandiseComponent,canActivate:[AuthGuard] },
    { path: 'productdetail', component: ProductDetailComponent,canActivate:[AuthGuard] },
    { path: 'adminDashboard', component: AdminDashboardComponent,canActivate:[AuthGuard] },
        {
          path: 'ExchangeAdmin',
          children: [
            { path: 'ExchangeadminComponent', component: ExchangeadminComponent },
            { path: 'UserdetailsComponent', component: UserdetailsComponent },
            { path: 'FeemanagementComponent', component: FeemanagementComponent },
            { path: 'MarketdetailComponent', component: MarketdetailComponent },
            { path: 'ExchangesettingComponent', component: ExchangesettingComponent },
            { path: 'CurrencylistComponent', component: CurrencylistComponent },
            { path: 'FundmanagementComponent', component: FundmanagementComponent },
            { path: 'ReportsComponent', component: ReportsComponent }
          ]
        },
    { path: 'invester-refer', component: InvesterReferComponent,canActivate:[AuthGuard] },
    { path: 'login', component:LoginComponent},
    { path: '404', component: childComponent },
    { path: '**', component: childComponent},

    ]},
  ];



  export const routing: ModuleWithProviders = RouterModule.forChild(routes);
