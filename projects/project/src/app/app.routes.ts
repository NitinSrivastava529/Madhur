import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MembersComponent } from './component/members/members.component';
import { WalletComponent } from './component/wallet/wallet.component';
import { LoginComponent } from './component/login/login.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { LevelIncomeComponent } from './component/level-income/level-income.component';
import { RewardIncomeComponent } from './component/reward-income/reward-income.component';
import { LevelReportComponent } from './component/level-report/level-report.component';
import { AccountComponent } from './component/account/account.component';
import { TeamComponent } from './component/team/team.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ReferComponent } from './component/refer/refer.component';
import { SupportComponent } from './component/support/support.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { LayoutComponent } from './component/layout/layout.component';
import { authGuard } from './guard/auth.guard';
import { RegKeyComponent } from './component/reg-key/reg-key.component';
import { TodayMemberComponent } from './component/today-member/today-member.component';
import { CompanyPlanComponent } from './component/company-plan/company-plan.component';
import { TermsConditionComponent } from './component/terms-condition/terms-condition.component';
import { MiniStoreComponent } from './component/mini-store/mini-store.component';
import { KycComponent } from './component/kyc/kyc.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration/:memberId', component: RegistrationComponent },
    { path: 'forget-password', component: ForgetPasswordComponent },
    {
        path: '', component: LayoutComponent, children: [
            { path: 'change-password', component: ChangePasswordComponent,canActivate:[authGuard] },
            { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard] },
            { path: 'wallet', component: WalletComponent,canActivate:[authGuard] },
            { path: 'members', component: MembersComponent,canActivate:[authGuard] },
            { path: 'level-income', component: LevelIncomeComponent,canActivate:[authGuard] },
            { path: 'reward-income', component: RewardIncomeComponent ,canActivate:[authGuard]},
            { path: 'level-report', component: LevelReportComponent,canActivate:[authGuard] },
            { path: 'account', component: AccountComponent ,canActivate:[authGuard]},
            { path: 'team', component: TeamComponent ,canActivate:[authGuard]},
            { path: 'contact-us', component: ContactUsComponent,canActivate:[authGuard] },
            { path: 'refer', component: ReferComponent,canActivate:[authGuard] },
            { path: 'reg-key', component: RegKeyComponent,canActivate:[authGuard] },
            { path: 'today-member', component: TodayMemberComponent,canActivate:[authGuard] },
            { path: 'company-plan', component: CompanyPlanComponent,canActivate:[authGuard] },
            { path: 'terms-condition', component: TermsConditionComponent,canActivate:[authGuard] },
            { path: 'mini-store', component: MiniStoreComponent,canActivate:[authGuard] },
            { path: 'kyc', component: KycComponent,canActivate:[authGuard] },
            { path: 'support', component: SupportComponent,canActivate:[authGuard] },          
        ]
    },   
    { path: '**', component: NotFoundComponent, pathMatch: 'full'  }
];
