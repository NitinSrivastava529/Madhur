import { Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {

  IsLoading: boolean = false;
  memberInfo: any = {};
  allMember: any = {};
  temp: string = "";
  filterObj = {
    "name": "string",
    "mobile": "",
    "param": "string",
    "pageNo": 1,
    "pageSize":10
  }
  global = inject(GlobalService);
  _http = inject(HttpClient);
  constructor() { }
  ngOnInit(): void {    
    this.GetMembers();
  }
  getPrev(){
    this.filterObj.mobile="";
    this.filterObj.pageNo--
    this.GetMembers();
  }
  getNext(){
    this.filterObj.mobile="";
    this.filterObj.pageNo++
    this.GetMembers();
  }
  getByMobileNo(){   
      this.filterObj.pageNo=1;
    this.GetMembers();
  }
  tempGroup(value: string) {
    if (this.temp != value) {
      this.temp = value;
      return true
    }
    else{
      return false;
    }
  }
  filterData(event: Event) {    
    this.temp="";
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.memberInfo = this.allMember.filter((res: any) =>
      res.memberName.toLowerCase().includes(value) |
      res.memberId.toLowerCase().includes(value) |
      res.mobileNo.toLowerCase().includes(value) |
      res.regPin.toLowerCase().includes(value));
  }
  GetMembers() {        
    this._http.post(this.global.baseUrl+'api/Member/GetMembers',this.filterObj,{headers:this.global.headers}).subscribe({
      next: (data) => {        
        this.memberInfo = data;
        this.allMember = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  UpdateStatus(memberId: string) {
    this.global.put("api/Member/UpdateStatus/" + memberId, {}).subscribe()
  }
}
