import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reward-income',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reward-income.component.html',
  styleUrl: './reward-income.component.css'
})
export class RewardIncomeComponent implements OnInit {

  repurchaseInfo: any =[];
  RegKey: string = "";
  _route = inject(Router);
  _http = inject(HttpClient);
  _global = inject(GlobalService);
  ngOnInit(): void {
    this.GetRepurchase();
  }

  Repurchase() {
    if (this.RegKey.length < 5) {
      alert('Please Enter Key');
      return;
    };
    var obj = {
      'url': 'api/Member/Repurchase?memberId=' + localStorage.getItem('MemberId') + '&RegKey=' + this.RegKey,
    }
    this._global.post(obj).subscribe((res) => {
      alert(res.message);
      if (res.result)
        this.GetRepurchase();
    })
  }
  GetRepurchase() {    
    this._http.get(this._global.baseUrl + 'api/Member/GetRepurchase?MemberId=' + localStorage.getItem('MemberId'), {}).subscribe({
      next: (data) => {
        this.repurchaseInfo = data;   
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
