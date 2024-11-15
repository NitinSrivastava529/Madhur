import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  LevelCount:any;
  global = inject(GlobalService);
  route = inject(Router);
  http=inject(HttpClient);
  memberId=localStorage.getItem('MemberId');
  memberInfo:any={};
  constructor(){
    this.GetMemberInfo();
    this.GetLevelCount();
  }
  GetMemberInfo(){
     this.http.get(this.global.baseUrl+'api/Member/GetMember/'+ localStorage.getItem('MemberId')).subscribe((res=>{
          this.memberInfo=res;    
          localStorage.setItem('MemberInfo',JSON.stringify(res)); 
     }))
  }
    GetLevelCount() {
    this.http.get(this.global.baseUrl + 'api/Member/LevelCount/' + localStorage.getItem('MemberId')).subscribe((res => {
      this.LevelCount = res;
    }))
  }
  logout() {
    if (confirm('are you sure?')) {
      localStorage.removeItem('IsLoggedIn');
      localStorage.removeItem('MemberId');
      localStorage.removeItem('MemberInfo');
      this.route.navigateByUrl('login');
    }
  }
}
