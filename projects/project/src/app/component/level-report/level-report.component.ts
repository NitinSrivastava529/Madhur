import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { __asyncDelegator } from 'tslib';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-level-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-report.component.html',
  styleUrl: './level-report.component.css'
})
export class LevelReportComponent implements OnInit {
  allLevelInfo: any
  levelInfo: any
  global = inject(GlobalService);
  http = inject(HttpClient);
  ngOnInit(): void {
    this.GetMember()
  }
  GetMember() {
    this.http.get(this.global.baseUrl+'api/Member/AllSelfMember?MemberId='+localStorage.getItem('MemberId')).subscribe(res => {
      this.allLevelInfo = res;
      this.levelInfo = res;      
    })
  }
}
