import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  dob_day: any = new Date().getDate();
  dob_month: any = (new Date().getMonth() + 1 < 10) ? ('0' + (new Date().getMonth() + 1)) : new Date().getMonth() + 1;
  dob_year: any = new Date().getFullYear() - 18;
  obj: any = {
    url: 'api/Auth/ForgetPassword',
    MobileNo: '',
    dob: ''
  }
  IsLoading: boolean = false;
  MemberId: string = "";
  Password: string = "";
  dayList:any=[];
  monthList:any=[]; 
  yearList:any=[]; 
  _http=inject(HttpClient);
  constructor(private global: GlobalService) {
    for(var i=1;i<=31;i++){
      this.dayList.push((i<10)?('0'+i):i)
    }
    for(var i=1;i<13;i++){
      this.monthList.push((i<10)?('0'+i):i)
    }
    for(var i=1960;i<2007;i++){
      this.yearList.push(i)
    }
   }
   createDOB() {
    const dobInfo = this.dob_year + "-" + this.dob_month + "-" + this.dob_day;
    this.obj.dob= dobInfo
  }
  Submit() {
    this.createDOB()
    if (this.obj.MobileNo == '') {
      alert('Please Provide Mobile No')
      return
    }
    if (this.obj.dob == '') {
      alert('Please Choose DOB')
      return
    }
    this.IsLoading=true;
    this.obj.url='api/Auth/ForgetPassword/'+this.obj.MobileNo+'/'+this.obj.dob;
    this.global.get(this.obj).subscribe((res) => {   
      if (!res.memberId.includes('Failed')) {
        this.MemberId=res.memberId;
        this.Password=res.password;
        this.IsLoading=false;
      }
      else {
        alert(res.memberId)
        this.IsLoading=false;
      }
    })
  }
}
