import { Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-today-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './today-member.component.html',
  styleUrl: './today-member.component.css'
})
export class TodayMemberComponent {
  levelInfo: any
  allLevelInfo: any
  LevelCount: any
  global = inject(GlobalService);
  http = inject(HttpClient);
  ngOnInit(): void {
    this.GetMember()
  }
  filterData(value:string) {          
    this.levelInfo = this.allLevelInfo.filter((res: any) =>
      res.memberName.toLowerCase().includes(value.toLowerCase())
  )}
  GetMember() {
    this.http.get(this.global.baseUrl + 'api/Member/TodayMember?MemberId=' + localStorage.getItem('MemberId') + '&Logic=AllMember').subscribe(res => {
      this.allLevelInfo = res;
      this.levelInfo = res;
    })
  }
}

