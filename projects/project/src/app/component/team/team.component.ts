import { Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  levelInfo: any
  allLevelInfo: any
  LevelCount: any
  global = inject(GlobalService);
  http = inject(HttpClient);
  ngOnInit(): void {
    this.GetMember()
    this.GetLevelCount()
  }
  filterData(event: Event) {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
    this.levelInfo = this.allLevelInfo.filter((res: any) =>
      res.memberId.toLowerCase().includes(val) |
      res.memberName.toLowerCase().includes(val) |
      res.mobileNo.toLowerCase().includes(val) |
      res.refId.toLowerCase().includes(val))
  }
  GetLevelCount() {
    this.http.get(this.global.baseUrl + 'api/Member/LevelCount/' + localStorage.getItem('MemberId')).subscribe((res => {
      this.LevelCount = res;
    }))
  }
  GetMember() {
    this.http.get(this.global.baseUrl + 'api/Member/AllMember?MemberId=' + localStorage.getItem('MemberId') + '&Logic=AllMember').subscribe(res => {
      this.allLevelInfo = res;
      this.levelInfo = res;
    })
  }
}
