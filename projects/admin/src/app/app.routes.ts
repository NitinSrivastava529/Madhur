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
import { YouTubeVideoComponent } from './component/you-tube-video/you-tube-video.component';
import { TermsConditionComponent } from './component/terms-condition/terms-condition.component';
import { StoreComponent } from './component/store/store.component';
import { OfficialPlanComponent } from './component/official-plan/official-plan.component';
import { DeactiveMemberComponent } from './component/deactive-member/deactive-member.component';
import { ApproveSubscribeComponent } from './component/approve-subscribe/approve-subscribe.component';
import { StoreKeyComponent } from './component/store-key/store-key.component';
import { RewardMemberComponent } from './component/reward-member/reward-member.component';
import { LeveldayComponent } from './component/levelday/levelday.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: LayoutComponent, children: [
            { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard] },
            { path: 'reg-key', component: RegKeyComponent,canActivate:[authGuard] },
            { path: 'member-list', component: MemberListComponent,canActivate:[authGuard] },          
            { path: 'deactive-member', component: DeactiveMemberComponent,canActivate:[authGuard] },          
            { path: 'level-details', component: LevelDetailsComponent,canActivate:[authGuard] },          
            { path: 'member-details/:memberid', component: MemberDetailsComponent,canActivate:[authGuard] },
            { path: 'purchase', component: PurchaseComponent,canActivate:[authGuard] },            
            { path: 'level-day', component: LeveldayComponent,canActivate:[authGuard] },            
            { path: 'official-plan', component:OfficialPlanComponent,canActivate:[authGuard] },            
            { path: 'terms-condition', component:TermsConditionComponent,canActivate:[authGuard] },            
            { path: 'reward-distributor', component: RewardDistributorComponent,canActivate:[authGuard] },
            { path: 'approve-subscribe', component: ApproveSubscribeComponent,canActivate:[authGuard] },
            { path: 'store', component: StoreComponent,canActivate:[authGuard] },             
            { path: 'reward-member', component: RewardMemberComponent,canActivate:[authGuard] },             
            { path: 'store-key', component: StoreKeyComponent,canActivate:[authGuard] }                     
        ]
    },
    { path: '**', component: NotFoundComponent }
];
