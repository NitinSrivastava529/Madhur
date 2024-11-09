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
    this.copyContent = 'बस आप को एक अगरबत्ती का पैकेट दूकान से खरीदने के बजाय ..\n'+
    'सीधे मधुर आस्था कंपनी की टीम से खरीना है और 10\n'+
    'लोगो को समझाना है वो भी लाखों रुपए कैसे कमा सकते हैं\n'+
    'एक अगरबत्ती पैकेट खरीद कर ..... वो भी घर बैठे बैठे\n' +this.ReferLink;

    this.shareContent = 'बस आप को एक अगरबत्ती का पैकेट दूकान से खरीदने के बजाय ..\n'+
    'सीधे मधुर आस्था कंपनी की टीम से खरीना है और 10\n'+
    'लोगो को समझाना है वो भी लाखों रुपए कैसे कमा सकते हैं\n'+
    'एक अगरबत्ती पैकेट खरीद कर ..... वो भी घर बैठे बैठे\n%0D%0A ' +encodeURIComponent(this.ReferLink);
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
