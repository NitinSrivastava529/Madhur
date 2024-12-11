import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
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
  statusMsg=signal('');
  storeList:any = [];  
  store={
    'state':JSON.parse(localStorage.getItem('MemberInfo')||'').state,
    'city':JSON.parse(localStorage.getItem('MemberInfo')||'').city
  }
  http = inject(HttpClient);
  global = inject(GlobalService);
  ngOnInit(): void {
    this.getStore(this.store.city)  
  }
  getStore(param:string) {
    this.statusMsg.set('Searching Store..');
    this.http.get(this.global.baseUrl + 'api/Member/GetStore/'+param).subscribe((res: any) => {
      this.storeList = res;
      if(this.storeList.length==0)
      this.statusMsg.set('No Store Found in your City.');
    else
    this.statusMsg.set('');
    })
  }
}
