import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule,HeaderComponent,HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isLogin: boolean = false;
  IsSlide: boolean = true;
  title = 'Admin';
  route=inject(Router);
  constructor(private _config:GlobalService) { _config.loadScript()}
  ngOnInit(): void {
    
  }
  logout() {
    if (confirm('are you sure?')) {
      localStorage.removeItem('IsAdminLoggedIn');
      this.route.navigateByUrl('login');
    }
  }
}