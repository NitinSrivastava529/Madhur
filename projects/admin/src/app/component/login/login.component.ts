import { Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  IsLoading: boolean = false;
  obj: any = {
    url: 'api/auth/login',
    memberId: 'MEM0000001',
    password: ''
  }
  router = inject(Router);
  constructor(private _config: GlobalService) { _config.loadScript() }
  login() {
    this.IsLoading = true;
    this._config.post(this.obj).subscribe((res => {
      if (res.result) {
        localStorage.setItem('IsAdminLoggedIn', 'true');
        localStorage.setItem('MemberId', this.obj.MemberId);
        this.IsLoading = false;
        this.router.navigateByUrl('dashboard');
      } else {
        alert(res.message)
        this.IsLoading = false;
      }
    }))
  }
}
