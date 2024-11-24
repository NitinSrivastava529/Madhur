import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, TRANSLATIONS } from '@angular/core';
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
export class RewardDistributorComponent {
  IsLoading: boolean = false;
  total:number=0;
  rewardInfo: RewardInfo[]=[];
  http = inject(HttpClient);
  global = inject(GlobalService);

  totalReward(){
    this.rewardInfo.forEach(item=>  this.total+=parseInt(item.level));
  }
  GetTotal(id: string) {   
    this.total+=0;
    this.IsLoading=true; 
    this.http.get(this.global.baseUrl + 'api/Member/RewardDistributorInfo?distributorId=' + id).subscribe((res:any) => {
       this.rewardInfo = res;
       console.log(res)
       this.IsLoading=false;
       this.totalReward();
    })
  }
  ResetDistributorReward(id: string) {       
    this.http.delete(this.global.baseUrl + 'api/Member/ResetDistributorReward?distributorId=' + id,{headers:this.global.headers}).subscribe((res) => {
      this.GetTotal(id)          
    })
  }
}
