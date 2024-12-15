import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../model/constant';

@Component({
  selector: 'app-deactive-member',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './deactive-member.component.html',
  styleUrl: './deactive-member.component.css'
})
export class DeactiveMemberComponent implements OnInit {
  memberInfo: any = {};
  global = inject(GlobalService);
  _http = inject(HttpClient);
  ngOnInit(): void {
    this.GetMembersActive() 
  }
  GetMembersActive() {       
   this._http.get(constant.API_URL+'api/Member/GetMembersInactive').subscribe({
     next: (data) => {        
       this.memberInfo = data;       
     },
     error: (error) => {
       console.log(error);
     }
   })
 }
}
