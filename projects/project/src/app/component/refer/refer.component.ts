import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';

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
  constructor(private global: GlobalService) {
    this.ReferLink = global.rootUrl + '#/registration/' + localStorage.getItem('MemberId');
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
}
