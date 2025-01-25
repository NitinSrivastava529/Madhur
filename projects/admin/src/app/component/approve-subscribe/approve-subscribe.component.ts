import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../model/constant';

@Component({
  selector: 'app-approve-subscribe',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterLink],
  templateUrl: './approve-subscribe.component.html',
  styleUrl: './approve-subscribe.component.css'
})
export class ApproveSubscribeComponent implements OnInit {
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
    this.GetSubscribe();
  }
  GetSubscribe() {
    this.http.get(this.global.baseUrl + 'api/Member/GetSubscribe').subscribe((res => {
      console.log(res)
      this.kycInfo = res;
    }))
  }
  getUrl(file: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(constant.API_URL + 'Resource/Kyc/' + file)
  } 
  UpdateSubscribe(memberId: string) {
    this.IsSubcribe.set('Updating..')
    this.global.put("api/Member/UpdateSubscribe/" + memberId, {}).subscribe(
      (res :any)=> {
        this.IsSubcribe.set('')
        this.GetSubscribe()
      }
    )
    
  }
}
