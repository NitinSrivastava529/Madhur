import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-level-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-details.component.html',
  styleUrl: './level-details.component.css'
})
export class LevelDetailsComponent {
  levelInfo:any=[
    {level:1, member:10,totalMember:15,status:'Achieved'},
    {level:2, member:100,totalMember:210,status:'Achieved'},
    {level:3, member:1000,totalMember:2134,status:'Achieved'},
    {level:4, member:10000,totalMember:1143,status:'Not Achieved'},
    {level:5, member:100000,totalMember:212,status:'Not Achieved'},
    {level:6, member:1000000,totalMember:443,status:'Not Achieved'},
    {level:7, member:10000000,totalMember:2453,status:'Not Achieved'},
    {level:8, member:100000000,totalMember:24533,status:'Not Achieved'},
  ];
}
