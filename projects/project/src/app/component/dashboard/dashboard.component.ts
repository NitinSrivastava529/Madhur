import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  memberId: any;
  IsVerified = signal('N');
  verified = signal({
    class: 'Subscribe',
    value: 'Checking...'
  });
  bannerList: any = [];
  _http = inject(HttpClient);
  _global = inject(GlobalService)
  constructor(global: GlobalService) {

  }
  ngOnInit(): void {
    this._global.loadScript();
    this.memberId = localStorage.getItem('MemberId');
    var val = JSON.parse(localStorage.getItem('MemberInfo') || '');
    if (val.isSubscribe == 'Y') {
      this.verified.set({
        class: 'Subscribed',
        value: 'Account Verified !'
      })
    }
    else {
      this.verified.set({
        class: 'Subscribe',
        value: 'Account Verification Now !'
      })
    }
  }
  OpenModal() {
    if (this.verified().class == 'Subscribe')
      alert(`अपना Account verification  करने के लिए आप को जल्द से जल्द अपने reference  लिंक से 10 लोगों joining  करवाना अनिवार्य है  नहीं तो आप की जॉइनिंग के एक महीने बाद account deactivate हो सकता है उसका जिम्मेदार आप खुद रहेंगे धन्यवाद
अधिक जानकारी के लिए संपर्क करें 9829787821`)
  }
  GetBanner() {
    this._http.get(this._global.baseUrl + 'api/Member/GetBanner').subscribe((res) => {
      this.bannerList = res;
    })
  }
}
