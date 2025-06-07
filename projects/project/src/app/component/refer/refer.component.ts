import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-refer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './refer.component.html',
  styleUrl: './refer.component.css'
})
export class ReferComponent {
  ReferLink: any;
  copyContent:string="";
  shareContent:string="";  
  memberId:string="";  
  memberInfo:any;
  filterObj = {
    "name": "string",
    "mobile": "",
    "param": "string",
    "pageNo": 1,
    "pageSize":10
  }
  _http=inject(HttpClient)
  _global=inject(GlobalService)
  constructor() {
    this.ReferLink = this._global.rootUrl + '#/registration/' + localStorage.getItem('MemberId');
    this.copyContent = 'घर से लाखों करोड़ों रुपए कमाए\n'+    
    'अपना रेफरल लिंक दोस्तों के साथ शेयर करे\n' +this.ReferLink;

    this.shareContent = 'घर से लाखों करोड़ों रुपए कमाए\n'+   
    'अपना रेफरल लिंक दोस्तों के साथ शेयर करे\n%0D%0A ' +encodeURIComponent(this.ReferLink);
  }

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.copyContent;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
   GetMembers() {     
    this._http.post(this._global.baseUrl+'api/Member/GetMembers',this.filterObj,{headers:this._global.headers}).subscribe({
      next: (data:any) => {                    
        this.memberInfo = data; 
        this.memberId =data[0].memberId; 
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  Register(){
     const ReferLink = this._global.rootUrl + '#/registration/' +  this.memberId;
     window.open( ReferLink,'_blank')
  }
}
