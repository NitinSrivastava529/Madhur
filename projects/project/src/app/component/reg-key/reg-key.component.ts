import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reg-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reg-key.component.html',
  styleUrl: './reg-key.component.css'
})
export class RegKeyComponent {
  global = inject(GlobalService);
  route = inject(Router);
  http = inject(HttpClient);
  RegKey: any = [];
  constructor(private ref: ChangeDetectorRef) {
this.RegKey=[];
  }
  IsLoading=false;
  ngOnInit(): void { 
    this.GetRegKey();
  }
   GetRegKey() {
    const obj = {
      url: "api/Member/RegKeys"
    };
    this.global.get(obj).subscribe({
      next: (data) => {
        this.RegKey = data;      
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  GenerateKey() {
    this.IsLoading=true;
    const obj = {
      url: "api/Member/GenerateKey"
    };
    this.global.get(obj).subscribe({
      next: (data) => {      
        this.GetRegKey();
        this.IsLoading=false;
      }
    })

  }
}
