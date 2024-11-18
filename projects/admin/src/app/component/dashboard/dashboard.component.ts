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
  AllTodayMembers: any = {};
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
  filterData(event: Event) {    
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.TodayMembers = this.AllTodayMembers.filter((res: any) =>
      res.memberName.toLowerCase().includes(value) |
      res.memberId.toLowerCase().includes(value) |
      res.mobileNo.toLowerCase().includes(value) |
      res.regPin.toLowerCase().includes(value));
  }
  GetTodayMembers() {
    var obj = {
      url: 'api/Member/GetTodayMembers'
    }
    this.global.get(obj).subscribe(res => {
      this.AllTodayMembers = res;
      this.TodayMembers = res;
    })
  }
}
