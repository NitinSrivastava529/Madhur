import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UrlCodec } from '@angular/common/upgrade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  global = inject(GlobalService);
  route = inject(Router);
  http = inject(HttpClient);
  memberInfo: any = {};
  referralId: string = "";
  IsLoading = false;
  dob_day: any = new Date().getDate();
  dob_month: any = (new Date().getMonth() + 1 < 10) ? ('0' + (new Date().getMonth() + 1)) : new Date().getMonth() + 1;
  dob_year: any = new Date().getFullYear() - 18;
  selectedState: string = "Select";
  obj: any = {
    url: 'api/Auth/AddMember',
    regPin: "",
    storeId: "",
    refId: "",
    memberName: "",
    password: "",
    mobileNo: "",
    dob: "",
    aadharNo: "",
    address: "-",
    state: "-",
    city: "-",
    pinCode: "123456",
    nominee: "-",
    relationWithNominee: "-",
    isActive: "Y",
    creationDate: new Date()
  }

  stateList: any = [];
  cityList: any = [];
  referralName: string = "";
  ConfirmPassword: string = "";
  IsAccepted: any
  IsReceived: any
  day: string = "";
  month: string = "";
  year: string = "";
  dayList: any = [];
  monthList: any = [];
  yearList: any = [];
  todayDate = new Date();
  age:number=0;
  constructor(private activatedRoute: ActivatedRoute) {
    this.referralId = activatedRoute.snapshot.paramMap.get('memberId') || '';
    this.obj.refId = activatedRoute.snapshot.paramMap.get('memberId') || '';
  }
  ngOnInit(): void {
    this.GetReferral();
    //this.GetState()
    this.dayList.push('DD')
    this.monthList.push('MM')
    this.yearList.push('YYYY')
    for (var i = 1; i <= 31; i++) {
      this.dayList.push((i < 10) ? ('0' + i) : i)
    }
    for (var i = 1; i < 13; i++) {
      this.monthList.push((i < 10) ? ('0' + i) : i)
    }
    for(var i=1960;i<=new Date().getFullYear()-18;i++){ 
      this.yearList.push(i)
    }
  }
  GetState() {
    this.http.get(this.global.baseUrl + 'api/Auth/GetState').subscribe((res => {
      this.stateList = res;
    }))
  }
  GetCity(StateCode: any) {
    this.http.get(this.global.baseUrl + 'api/Auth/GetDistrict/' + StateCode.split('|')[0]).subscribe((res => {
      this.cityList = res;
    }))
  }
  GetReferral() {
    this.http.get(this.global.baseUrl + 'api/Member/GetMember/' + this.referralId).subscribe((res => {
      this.memberInfo = res;
      this.referralName = 'Referral Name : ' + this.memberInfo.memberName;
    }))
  }
  createDOB() {
    const dobInfo = this.dob_year + "-" + this.dob_month + "-" + this.dob_day;
    this.obj.dob= dobInfo    
  }
  Register() {      
    if (this.validate()) {      
      this.IsLoading = true;
      this.global.post(this.obj).subscribe((res => {        
        if (res.message.includes('Success')) {
          alert(res.message)
          this.clear();
          this.IsLoading = false;
          this.login(res.memberId,res.password)        
        } else {
          alert(res.message)
          this.IsLoading = false;
        }
      }))
    }
  }
  validate() {
    if (this.obj.regPin == '') {
      alert('Please Fill E Pin Number')
      return false
    }
    if (this.obj.storeId == '') {
      alert('Please Fill Store Id')
      return false
    }
    if (this.obj.refId == '') {
      alert('Referral Id Not Found')
      return false
    }
    if (this.obj.memberName == '') {
      alert('Please Fill Member Name')
      return false
    }
    if (this.obj.mobileNo == '') {
      alert('Please Fill Mobile No')
      return false
    } else if (this.obj.mobileNo.length != 10) {
      alert('Please Fill 10 digit Mobile No')
      return false
    }
    // var dob=parseInt(this.dob_year)+parseInt(this.dob_month)+parseInt(this.dob_day);
    // var today=this.todayDate.getFullYear()+this.todayDate.getMonth()+1+this.todayDate.getDate();

    if (this.obj.dob == '') {
      alert('Please Fill DOB')
      return false
    } 
    // else if((today-dob)<18){
    //   alert('your age is '+(today-dob)+'. not allowed !')
    //   return false
    // }
    // if (this.obj.aadharNo == '') {
    //   alert('Please Fill Aadhar No')
    //   return false
    // } else if (this.obj.aadharNo.length != 12) {
    //   alert('Please Fill 12 digit Aadhar No')
    //   return false
    // }
    // if (this.obj.address == '') {
    //   alert('Please Fill Full Address')
    //   return false
    // }
    // if (this.selectedState == 'Select') {
    //   alert('Please Fill State')
    //   return false
    // }
    // if (this.obj.city == 'Select') {
    //   alert('Please Fill City')
    //   return false
    // }
    // if (this.obj.pinCode == '') {
    //   alert('Please Fill Pin Code')
    //   return false
    // } else if (this.obj.pinCode.length != 6) {
    //   alert('Please Fill 6 digit Pin Code')
    //   return false
    // }
    // if (this.obj.nominee == '') {
    //   alert('Please Fill Nominee Name')
    //   return false
    // }
    // if (this.obj.relationWithNominee == '') {
    //   alert('Please Fill Relation With Nominee')
    //   return false
    // }
    if (this.obj.password == '') {
      alert('Please Fill Password')
      return false
    } 
    // else if (this.obj.password != this.ConfirmPassword) {
    //   alert('Confirm Password not Matched')
    //   return false
    // }
    if (!this.IsReceived) {
      alert('Please Check Package Received?')
      return false
    }
    if (!this.IsAccepted) {
      alert('Please Accept Terms & Conditions')
      return false
    }
    return true;
  }
  //Login Call
  login(memberId:string,password:string) {   
   const objLogin = {
      url: 'api/Auth/Login',
      MemberId:memberId,
      Password: password
    } 
    this.global.post(objLogin).subscribe((res => {
      if (res.response.result) {
        localStorage.setItem('UserToken', res.token);
        localStorage.setItem('IsLoggedIn', 'true');
        localStorage.setItem('MemberId', objLogin.MemberId);       
        this.route.navigateByUrl('dashboard');
    } 
    }))

  }
  clear() {
    this.obj = {
      url: 'api/Member/AddMember',
      regPin: "",
      refId: this.referralId,
      memberName: "",
      password: "",
      mobileNo: "",
      dob: "",
      aadharNo: "",
      address: "",
      state: "",
      city: "Select",
      pinCode: "",
      nominee: "",
      relationWithNominee: "Select",
      isActive: "Y",
      creationDate: new Date()
    }
    this.selectedState = "Select";
  }
}
