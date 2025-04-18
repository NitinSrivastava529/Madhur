import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";
import { constant } from '../../model/constant';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [CommonModule, FormsModule,LayoutComponent, RouterLink],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
  changeDetection:ChangeDetectionStrategy.Default
})
export class MemberDetailsComponent implements OnInit {
  LevelCount: any = {};
  selfMember: any = {};
  Info: any = {};
  kycInfo: any = {};
  totalMem: number = 0;
  totalPur: number = 0;
  IsLoading: boolean = false;
  IsSubcribe=signal('')
  memberId: any = "";
  global = inject(GlobalService);
  http = inject(HttpClient);
  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { this.memberId = activatedRoute.snapshot.paramMap.get('memberid') }
  ngOnInit(): void {
    this.GetMember();
    this.selfMemberInfo();
    this.GetLevelCount();
    this.GetKyc();
  }
  GetKyc() {
    this.http.get(constant.API_URL + 'api/member/GetKyc/' + this.memberId).subscribe((res: any) => {
      console.warn(res)
      this.kycInfo = res;
    })
  }
  getUrl(file: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(constant.API_URL + 'Resource/Kyc/' + file)
  }
  totalInfo() {
    this.selfMember.forEach((item: any) => {
      if (item.memberName.includes('Repurchase'))
        this.totalPur++;
      else
        this.totalMem++;
    })
  }
  isLevel(){
    return Object.keys(this.LevelCount).length>0
  }
  GetMember() {
    this.http.get(this.global.baseUrl + 'api/Member/GetMember/' + this.memberId).subscribe((res => {
      this.Info = res;
    }))
  }
  GetLevelCount() {
    this.http.get(this.global.baseUrl + 'api/Member/LevelCount/' + this.memberId).subscribe((res => {
      this.LevelCount = res;
    }))
  }
  selfMemberInfo() {
    this.IsLoading = true;
    this.http.get(this.global.baseUrl + 'api/Member/AllSelfMemberAdmin?MemberId=' + this.memberId).subscribe(res => {
      this.selfMember = res;
      this.IsLoading = false;
      this.totalInfo();
    })
  }
  SetDob(dob:string){     
     this.Info.dob=dob;
  }
  UpdateData(){    
    var obj={
      'MemberId':this.memberId,
      'MemberName':this.Info.memberName,
      'dob':this.Info.dob,
      'MobileNo':this.Info.mobileNo,
      'Address':this.Info.address,
      'PinCode':this.Info.pinCode,
      'Nominee':this.Info.nominee,
      'RelationWithNominee':this.Info.relationWithNominee,
    }  
    this.global.put("api/Member/UpdateMemberByAdmin/", obj).subscribe(
      (res :any)=> {        
        this.IsSubcribe.set('')
        alert('Successfully Updated')       
      }
    )
  }
  UpdateSubscribe(memberId: string) {
    this.IsSubcribe.set('Updating..')
    this.global.put("api/Member/UpdateSubscribe/" + memberId, {}).subscribe(
      (res :any)=> {
        this.IsSubcribe.set('')
        this.GetMember()
      }
    )
    
  }
}
