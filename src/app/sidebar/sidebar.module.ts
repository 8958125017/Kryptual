import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { SidebarComponent } from './sidebar.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { ViewUserComponent } from './../dashboard/UserList/view-user/view-user.component';
import { MyProfileComponent } from './../dashboard/UserList/my-profile/my-profile.component';
import { SettingComponent } from './../dashboard/UserList/setting/setting.component';
import { HelpComponent } from './../dashboard/UserList/help/help.component';
import { InvestIcoComponent } from './../dashboard/UserList/investIco/investIco.component';
import { SendtokenComponent } from './../dashboard/UserList/sendtoken/sendtoken.component';
import { ReferComponent } from './../dashboard/UserList/refer/refer.component';
import { InvesterReferComponent } from './../dashboard/UserList/invester-refer/invester-refer.component';
import { GenerateIcoComponent } from './../dashboard/UserList/generate-ico/generate-ico.component';
import { CrowdsaleComponent } from './../dashboard/UserList/crowdsale/crowdsale.component';
import { InvestComponent } from './../dashboard/UserList/invest/invest.component';
import { childComponent } from './../dashboard/error404/error404.component';
import { routing } from './sidebar.routing';
import { AuthGuard } from './../auth-guard.service';
import { SelectModule } from 'ng2-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FilterPipe,SortByPipe,OrderByDate,RoundPipe,DatexPipe,SafeHtml} from './../Pipes/pipe';
import { MerchandiseComponent } from '../dashboard/UserList/merchandise/merchandise.component';
import { ProductDetailComponent } from '../dashboard/UserList/product-detail/product-detail.component';
import { ImageZoomModule} from 'angular2-image-zoom';
import { AdminDashboardComponent } from '../dashboard/admin_User/admin_Dashboard/admin_Dashboard.component';
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        routing,
        HttpModule,
        NavbarModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        ImageZoomModule
       ],

    providers: [AuthGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe],

    declarations: [
        FilterPipe ,
        SortByPipe,
        OrderByDate,
        RoundPipe,
        SafeHtml,
        DatexPipe,
        SidebarComponent,
        DashboardComponent,
        ViewUserComponent,
        InvesterReferComponent,
        MyProfileComponent,
        SettingComponent,
        HelpComponent,
        InvestIcoComponent,
        childComponent,
        SendtokenComponent,
        ReferComponent,
        GenerateIcoComponent,
        CrowdsaleComponent,
        InvestComponent,
        MerchandiseComponent,
        ProductDetailComponent,
        AdminDashboardComponent
     ],

    exports: [ SidebarComponent ]
})

export class SidebarModule {}
