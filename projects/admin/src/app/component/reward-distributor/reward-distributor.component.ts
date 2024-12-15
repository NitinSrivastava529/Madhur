import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, TRANSLATIONS } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { RewardInfo } from '../../model/RewardInfo';

@Component({
  selector: 'app-reward-distributor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reward-distributor.component.html',
  styleUrl: './reward-distributor.component.css'
})
export class RewardDistributorComponent implements OnInit {
  storeInfo: any;
  storeId: string = '';
  IsLoading: boolean = false;
  total: number = 0;
  rewardInfo: RewardInfo[] = [];
  http = inject(HttpClient);
  global = inject(GlobalService);
  ngOnInit(): void {
    this.RewardStoreTotal()
  }
  totalReward() {
    this.total = 0;
    this.rewardInfo.forEach(item => this.total += parseInt(item.level));
  }
  RewardStoreTotal() {
    this.http.get(this.global.baseUrl + 'api/Member/RewardStoreTotal').subscribe((res: any) => {
      this.storeInfo = res;
      this.storeId = '';
    })
  }
  GetTotal(id: string) {
    this.storeId = id;
    this.IsLoading = true;
    this.http.get(this.global.baseUrl + 'api/Member/RewardDistributorInfo?storeId=' + id).subscribe((res: any) => {
      this.rewardInfo = res;
      this.IsLoading = false;
      this.totalReward();
    })
  }
  ResetDistributorReward() {
    if (confirm('are you sure?')) {
      this.http.delete(this.global.baseUrl + 'api/Member/ResetDistributorReward?storeId=' + this.storeId, { headers: this.global.headers }).subscribe((res) => {
        this.RewardStoreTotal()
        this.GetTotal(this.storeId)
      })
    }

  }
}
