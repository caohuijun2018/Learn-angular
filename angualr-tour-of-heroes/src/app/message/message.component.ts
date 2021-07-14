import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {


  constructor(public messageService : MessageService) { } //这里的messageService必须时public。这样将会在模版绑定到它

  ngOnInit(): void {
  }

}
