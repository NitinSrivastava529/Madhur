import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  info: any = "";
  obj: any = {
    url: 'api/Auth/ChangePassword',
    Password: '',
    MemberId: ''
  }
  global = inject(GlobalService);
  constructor() { }
  ngOnInit(): void {
    this.info = JSON.parse(localStorage.getItem('MemberInfo') || '{}');   
    this.obj.MemberId = this.info.memberId;
  }
  ChangePassword() {
    this.global.post(this.obj).subscribe((res => {
      alert(res.message);
    }))
  }
}
