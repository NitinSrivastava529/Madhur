import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { constant } from '../../model/constant';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reward-member',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reward-member.component.html',
  styleUrl: './reward-member.component.css'
})
export class RewardMemberComponent {
  IsLoading: boolean = false;
  dto = {
    'from': '1900/01/01',
    'to': '1900/01/01',
    'total': 1
  };
  memberInfo: any;
  http = inject(HttpClient)
  GetDetails() {
    this.IsLoading = true;
    this.http.get(constant.API_URL + 'api/member/RewardMemberTotal?fromDate=' + this.dto.from + '&toDate=' + this.dto.to + '&total=' + this.dto.total).subscribe((res: any) => {
      this.memberInfo = res;
      this.IsLoading = false;
    })
  }
}
