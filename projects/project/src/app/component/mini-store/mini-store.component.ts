import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { state } from '@angular/animations';
import { CONSTANT } from '../../Model/constant';

@Component({
  selector: 'app-mini-store',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mini-store.component.html',
  styleUrl: './mini-store.component.css'
})
export class MiniStoreComponent implements OnInit {
  storeList:any = [];  
  store={
    'state':JSON.parse(localStorage.getItem('MemberInfo')||'').state,
    'city':JSON.parse(localStorage.getItem('MemberInfo')||'').city
  }
  //   store={
  //   'state':'Uttar Pradesh',
  //   'city':'Lucknow'
  // }
  http = inject(HttpClient);
  global = inject(GlobalService);
  ngOnInit(): void {
    this.getStore()  
  console.log(this.store)
  }
  getStore() {
    this.http.get(this.global.baseUrl + 'api/Member/GetStore/'+this.store.state+'/'+this.store.city).subscribe((res: any) => {
      this.storeList = res;
      console.log(res)
    })
  }
}
