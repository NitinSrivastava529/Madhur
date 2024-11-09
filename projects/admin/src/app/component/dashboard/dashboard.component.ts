import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  TotalInfo: any = {};
  TodayMembers: any = {};
  global = inject(GlobalService);
  ngOnInit(): void {
    this.TotalCount();
    this.GetTodayMembers();
  }
  TotalCount() {
    var obj = {
      url: 'api/Member/TotalCount'
    }
    this.global.get(obj).subscribe(res => {
      this.TotalInfo = res;
    })
  }
  GetTodayMembers() {
    var obj = {
      url: 'api/Member/GetTodayMembers'
    }
    this.global.get(obj).subscribe(res => {
      this.TodayMembers = res;
    })
  }
}
