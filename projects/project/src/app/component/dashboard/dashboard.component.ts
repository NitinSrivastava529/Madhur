import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  memberId:any;
  constructor(global:GlobalService){
    global.loadScript();
    this.memberId=localStorage.getItem('MemberId');
    }
}
