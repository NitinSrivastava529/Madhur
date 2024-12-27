import { Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  levelInfo: any
  allLevelInfo: any
  LevelCount: any
  totalMem:number=0;
  totalPur:number=0;
  global = inject(GlobalService);
  http = inject(HttpClient);
  ngOnInit(): void {
    this.GetMember()
    this.GetLevelCount()
  }
  totalCal(){
    this.levelInfo.forEach((item:any)=>{
      if(item.memberName.includes('Repurchase'))
        this.totalPur++;
      else
      this.totalMem++;
    })
  }
  filterData(event: Event) {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
    this.levelInfo = this.allLevelInfo.filter((res: any) =>
      res.memberId.toLowerCase().includes(val) |
      res.memberName.toLowerCase().includes(val) |
      res.mobileNo.toLowerCase().includes(val) |
      res.refId.toLowerCase().includes(val))
  }
  filterType(value:string) {          
    this.levelInfo = this.allLevelInfo.filter((res: any) =>
      res.memberName.toLowerCase().includes(value.toLowerCase())
  )}
  GetLevelCount() {
    this.http.get(this.global.baseUrl + 'api/Member/LevelCount/' + localStorage.getItem('MemberId')).subscribe((res => {
      this.LevelCount = res;
    }))
  }
  GetMember() {
    this.http.get(this.global.baseUrl + 'api/Member/AllMember?MemberId=' + localStorage.getItem('MemberId')).subscribe(res => {
      this.allLevelInfo = res;
      this.levelInfo = res;           
    })
  }
}
