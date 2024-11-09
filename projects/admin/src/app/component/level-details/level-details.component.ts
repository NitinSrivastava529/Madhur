import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-level-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-details.component.html',
  styleUrl: './level-details.component.css'
})
export class LevelDetailsComponent implements OnInit,AfterContentChecked {
  levelInfo: any = [];
  global = inject(GlobalService);
  _http = inject(HttpClient);
  cdr=inject(ChangeDetectorRef);
  temp:string="";
  level:any={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};
  ngOnInit(): void {
      this.LevelWiseMember();  
      
  }
  ngAfterContentChecked(): void {
    this.level={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};
    this.cdr.detectChanges()
  }
  groupBy(value:string){
    this.level[parseInt(value)]++;   
    if(this.temp!=value){    
      this.temp=value;
      return true
    }
    else
    {
      return false
    }
  }
  LevelWiseMember() {
    this._http.get(this.global.baseUrl + 'api/Member/LevelWiseMember', {}).subscribe({
      next: (data) => {
        this.levelInfo = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
