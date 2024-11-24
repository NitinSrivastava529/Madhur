import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { ApproveReward } from '../../Model/ApproveReward';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-level-income',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './level-income.component.html',
  styleUrl: './level-income.component.css'
})
export class LevelIncomeComponent implements OnInit {
  levelIncome: any;
  key1:string="";
  key2:string="";
  approveReward: ApproveReward = new ApproveReward();
  IsLoading: boolean = false;
  _http = inject(HttpClient);
  global = inject(GlobalService);
  constructor() { }
  ngOnInit(): void {
    this.GetReward();
  }
  Approve(level: string) {
    if(level=='2')
      this.approveReward.key=this.key1+'|'+this.key2;
    else
    this.approveReward.key=this.key1;    
    
    this.approveReward.MemberId = localStorage.getItem('MemberId') || '';
    this.approveReward.Level = level;
    this.IsLoading = true;
    this._http.post(this.global.baseUrl + 'api/Member/ApproveReward', JSON.stringify(this.approveReward), { headers: this.global.headers }).subscribe((res: any) => {
     console.log(res)
      if (res.result) {
        this.GetReward();
        this.approveReward=new ApproveReward();
        alert(res.message)
      }
      else{
        alert(res.message)
      }
      this.IsLoading = false;
    })
  }
  GetReward() {
    this.IsLoading = true;
    this._http.get(this.global.baseUrl + 'api/Member/GetReward?MemberId=' + localStorage.getItem('MemberId'), {}).subscribe({
      next: (data) => {
        this.levelIncome = data;
        this.IsLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
