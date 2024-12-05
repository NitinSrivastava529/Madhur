import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CONSTANT } from '../../Model/constant';
import { CompanyPlan } from '../../Model/company-plan';

@Component({
  selector: 'app-company-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-plan.component.html',
  styleUrl: './company-plan.component.css'
})
export class CompanyPlanComponent implements OnInit {

  videoList:WritableSignal<CompanyPlan[]>=signal<CompanyPlan[]>([]);
  http:any=inject(HttpClient)
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.GetVideo()
  }
  getUrl(code: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + code);
  }
  GetVideo() {
    this.http.get(CONSTANT.API_URL+'api/member/GetVideo').subscribe((res:any)=>{ 
      this.videoList.set(res);     
    })
 }
}
