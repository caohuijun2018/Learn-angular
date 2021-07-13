import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message : String[] = [];

  add(message : string) {
    this.message.push(message)
  }

  clear() {
    this.message  = [];
  }
   constructor() { }
}
