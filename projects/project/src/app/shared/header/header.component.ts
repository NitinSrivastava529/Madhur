import { Component, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  LevelCount:any;
  global = inject(GlobalService);
  route = inject(Router);
  http=inject(HttpClient);
  memberId=localStorage.getItem('MemberId');
  memberInfo:any={};
  constructor(){
  }
  ngOnInit(): void {
    this.global.loadScript();
     this.GetMemberInfo();
     this.GetLevelCount();    
  }
  checkLevel(){
    return ['3','4','5','6','7','8','9'].some(a=>a==this.LevelCount[0].level);
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
      localStorage.removeItem('UserToken');
      localStorage.removeItem('IsLoggedIn');
      localStorage.removeItem('MemberId');
      localStorage.removeItem('MemberInfo');
      this.route.navigateByUrl('login');
    }
  }
}
