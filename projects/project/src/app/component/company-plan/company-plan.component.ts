import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-company-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-plan.component.html',
  styleUrl: './company-plan.component.css'
})
export class CompanyPlanComponent {

  videoList: any=signal([]);
  http=inject(HttpClient)
  constructor(private sanitizer: DomSanitizer) {
    this.videoList = ['fHtmv36m4mI', '5HWBGefBdzw', 'fHtmv36m4mI'];
  }
  getUrl(code: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + code + '/');
  }
  GetVideo() {
    this.http.get(constant.API_URL+'api/member/GetVideo').subscribe((res:any)=>{
       this.videoList.set(res);     
    })
 }
}
