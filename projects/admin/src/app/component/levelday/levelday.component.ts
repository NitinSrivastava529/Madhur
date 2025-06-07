import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { constant } from '../../model/constant';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-levelday',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './levelday.component.html',
  styleUrl: './levelday.component.css'
})
export class LeveldayComponent {
  IsLoading: boolean = false;
  dto = {  
    'level': 1,
    'day': 10
  };
  memberInfo: any;
  http = inject(HttpClient)
  GetDetails() {
    this.IsLoading = true;
    this.http.get(constant.API_URL + 'api/member/LevelWithinDay?level=' + this.dto.level + '&day=' + this.dto.day).subscribe((res: any) => {
      this.memberInfo = res;
      this.IsLoading = false;
    })
  }
}
