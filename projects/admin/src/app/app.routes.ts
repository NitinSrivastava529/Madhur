import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LayoutComponent } from './component/layout/layout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegKeyComponent } from './component/reg-key/reg-key.component';
import { MemberListComponent } from './component/member-list/member-list.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { authGuard } from './guard/auth.guard';
import { MemberDetailsComponent } from './component/member-details/member-details.component';
import { LevelDetailsComponent } from './component/level-details/level-details.component';
import { PurchaseComponent } from './component/purchase/purchase.component';
import { RewardDistributorComponent } from './component/reward-distributor/reward-distributor.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: LayoutComponent, children: [
            { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard] },
            { path: 'reg-key', component: RegKeyComponent,canActivate:[authGuard] },
            { path: 'member-list', component: MemberListComponent,canActivate:[authGuard] },          
            { path: 'level-details', component: LevelDetailsComponent,canActivate:[authGuard] },          
            { path: 'member-details/:memberid', component: MemberDetailsComponent,canActivate:[authGuard] },
            { path: 'purchase', component: PurchaseComponent,canActivate:[authGuard] },            
            { path: 'reward-distributor', component: RewardDistributorComponent,canActivate:[authGuard] }                     
        ]
    },
    { path: '**', component: NotFoundComponent }
];
