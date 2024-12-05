import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CONSTANT } from '../../Model/constant';

@Component({
  selector: 'app-terms-condition',
  standalone: true,
  imports: [],
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.css'
})
export class TermsConditionComponent implements OnInit{
  htmlContent:any;
  http=inject(HttpClient)  
  global=inject(GlobalService)
  ngOnInit(): void {
    this.GetTermsCondition()    
  }

  GetTermsCondition() {
    this.http.get(CONSTANT.API_URL+'api/member/GetTermsCondition').subscribe((res:any)=>{
       this.htmlContent=res.content;
    })
  }
}
