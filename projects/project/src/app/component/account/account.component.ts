import { Component, inject, signal } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  IsUpdating=signal(false);
  global = inject(GlobalService);
  route = inject(Router);
  http=inject(HttpClient);
  memberId=localStorage.getItem('MemberId');
  memberInfo:any={};
  constructor(){
    this.GetMemberInfo();
  }
  SetDob(dob:string){     
    this.memberInfo.dob=dob;
 }
 UpdateData(){    
  this.IsUpdating.set(true)
  var obj={
    'MemberId':this.memberId,
    'MemberName':this.memberInfo.memberName,
    'dob':this.memberInfo.dob,
    'MobileNo':this.memberInfo.mobileNo,
    'AadharNo':this.memberInfo.aadharNo,
    'Address':this.memberInfo.address,
    'State':this.memberInfo.state,
    'City':this.memberInfo.city,
    'PinCode':this.memberInfo.pinCode,
    'Nominee':this.memberInfo.nominee,
    'RelationWithNominee':this.memberInfo.relationWithNominee,
  }  
  this.global.put("api/Member/UpdateMemberByUser/", obj).subscribe(
    (res :any)=> {             
      alert('Successfully Updated')       
      this.IsUpdating.set(false)
    }
  )
}
  GetMemberInfo(){
     this.http.get(this.global.baseUrl+'api/Member/GetMember/'+this.memberId).subscribe((res=>{
          this.memberInfo=res;          
     }))
  }
}
