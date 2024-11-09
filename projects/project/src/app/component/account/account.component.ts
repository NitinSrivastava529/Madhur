import { Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  global = inject(GlobalService);
  route = inject(Router);
  http=inject(HttpClient);
  memberId=localStorage.getItem('MemberId');
  memberInfo:any={};
  constructor(){
    this.GetMemberInfo();
  }
  GetMemberInfo(){
     this.http.get(this.global.baseUrl+'api/Member/GetMember/'+this.memberId).subscribe((res=>{
          this.memberInfo=res;          
     }))
  }
}
