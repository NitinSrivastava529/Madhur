import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-income',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-income.component.html',
  styleUrl: './level-income.component.css'
})
export class LevelIncomeComponent implements OnInit  {
  levelIncome:any;
  IsLoading:boolean=false;
  _http=inject(HttpClient);
  global=inject(GlobalService);
  constructor(){}
  ngOnInit(): void {
    this.GetReward();
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
