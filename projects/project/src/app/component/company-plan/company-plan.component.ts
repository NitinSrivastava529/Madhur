import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CONSTANT } from '../../Model/constant';
import { CompanyPlan } from '../../Model/company-plan';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-company-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-plan.component.html',
  styleUrl: './company-plan.component.css'
})
export class CompanyPlanComponent implements OnInit {

  videoList:WritableSignal<CompanyPlan[]>=signal<CompanyPlan[]>([]);
  pdfList:WritableSignal<CompanyPlan[]>=signal<CompanyPlan[]>([]);
  msg=signal('')
  http:any=inject(HttpClient)
  global:any=inject(GlobalService)
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
   
  }
  getImgUrl(file: string) {
    return CONSTANT.API_URL+'Resource/Plan/' + file;
   // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
  }
  getUrl(code: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + code);
  }
  getPdfUrl(code: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/viewer?url='+this.global.baseUrl + 'Resource/Plan/' + code+'&embedded=true')
  }
 GetVideo() {
  this.msg.set('Loading...') 
  this.pdfList.set([])
  this.http.get(CONSTANT.API_URL + 'api/member/GetPlan?type=Youtube').subscribe((res: any) => {
    this.videoList.set(res); 
    if(this.videoList().length==0)
      this.msg.set('Youtube Video Not Found') 
    else
    this.msg.set('') 
  })
}
GetPdf() {
  this.msg.set('Loading...') 
  this.videoList.set([])
  this.http.get(CONSTANT.API_URL + 'api/member/GetPlan?type=Pdf').subscribe((res: any) => {
    this.pdfList.set(res);
    if(this.pdfList().length==0)
      this.msg.set('Pdf Not Found') 
    else
    this.msg.set('') 
  })
}
}
