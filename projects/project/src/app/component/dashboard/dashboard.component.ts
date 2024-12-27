import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  memberId: any;
  bannerList: any = [];
  _http = inject(HttpClient);
  _global = inject(GlobalService)
  constructor(global: GlobalService) {
    global.loadScript();
    this.memberId = localStorage.getItem('MemberId');
  }
  ngOnInit(): void {
    this.GetBanner();
  }
  GetBanner() {
    this._http.get(this._global.baseUrl + 'api/Member/GetBanner').subscribe((res) => {
      this.bannerList = res;    
    })
  }
}
