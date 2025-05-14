import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  obj: any = {
    url: 'api/Auth/Login',
    MemberId: '',
    Password: ''
  }
  IsLoading=false;
  constructor(private global: GlobalService) { }
  router = inject(Router);
  http = inject(HttpClient);
  login() {
    if (this.obj.MemberId == '') {
      alert('Please Provide MemberId')
      return
    }
    if (this.obj.Password == '') {
      alert('Please Provide Password')
      return
    }
    this.IsLoading=true;
    this.global.post(this.obj).subscribe((res => {
      if (res.response.result) {
        localStorage.setItem('UserToken',res.token);
        localStorage.setItem('IsLoggedIn', 'true');
        localStorage.setItem('MemberId', this.obj.MemberId);
        this.IsLoading=false;
        this.router.navigateByUrl('dashboard');
      } else {
        // alert(res.response.message)
        // this.IsLoading=false;
      }
    }))

  }
}
