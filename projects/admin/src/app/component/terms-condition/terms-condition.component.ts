import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import Quill from 'quill';
import { GlobalService } from '../../services/global.service';
import { constant } from '../../model/constant';

@Component({
  selector: 'app-terms-condition',
  standalone: true,
  imports: [CommonModule,FormsModule,AngularEditorModule],
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.css'
})
export class TermsConditionComponent implements OnInit {
  htmlContent:any;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '400px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: false,
    toolbarPosition: 'top'
};
http=inject(HttpClient)  
global=inject(GlobalService)
ngOnInit(): void {
  this.GetTermsCondition()    
}
GetTermsCondition() {
  this.http.get(constant.API_URL+'api/member/GetTermsCondition').subscribe((res:any)=>{
     this.htmlContent=res.content;
  })
}
Submit() {
  var obj={
    'content':this.htmlContent
  }
   this.http.post(constant.API_URL+'api/member/AddTerms',obj,{headers:this.global.headers}).subscribe((res:any)=>{
    this.GetTermsCondition();
    alert('Successfully Saved')      
   })
}
}
