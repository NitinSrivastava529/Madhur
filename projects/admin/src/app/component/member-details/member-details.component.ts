import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [CommonModule, LayoutComponent,RouterLink],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {
  LevelCount: any = {};
  selfMember: any = {};
  Info: any = {};
  totalMem:number=0;
  totalPur:number=0;
  IsLoading: boolean = false;
  memberId: any = "";
  global = inject(GlobalService);
  http = inject(HttpClient);
  constructor(private activatedRoute: ActivatedRoute) { this.memberId = activatedRoute.snapshot.paramMap.get('memberid') }
  ngOnInit(): void {
    this.GetMember();
    this.selfMemberInfo();
    this.GetLevelCount();
  }
  totalInfo(){
    this.selfMember.forEach((item:any)=>{
       if(item.memberName.includes('Repurchase'))
        this.totalPur++;
      else
      this.totalMem++;
    })
  }
  GetMember() {
    this.http.get(this.global.baseUrl + 'api/Member/GetMember/' + this.memberId).subscribe((res => {
      this.Info = res;
    }))
  }
  GetLevelCount(){
    this.http.get(this.global.baseUrl+'api/Member/LevelCount/'+this.memberId).subscribe((res=>{
         this.LevelCount=res;         
    }))
 }
  selfMemberInfo() {
    this.IsLoading=true;
    this.http.get(this.global.baseUrl+'api/Member/AllSelfMemberAdmin?MemberId='+this.memberId +'&Logic=AllSelfMember').subscribe(res => {
      this.selfMember = res;      
      this.IsLoading=false;
      this.totalInfo();
    })
  }
}
