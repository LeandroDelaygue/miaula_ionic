import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import {ttChat} from "./ttChat";

@IonicPage()
@Component({
  selector: 'chat-master',
  templateUrl: 'chat.html'
})
export class ChatPage {
  chat:ttChat;
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;

  data = { type:'', nickname:'', message:'' };

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
   /* this.chat.message ="probando";
    this.chat.sendDate = new Date();
    this.chat.type = 'exit';
    this.chat.user ='Leandro';*/



    this.roomkey = "5";
    this.nickname = "Leandro";
    this.data.type = 'message';
    this.data.nickname = this.nickname;

    console.log(this.data);
    console.log(this.data.type);
    console.log(this.data.nickname);
  }
  sendMessage() {

      this.chat = new ttChat();


      this.chat.type = this.data.type,
      this.chat.user = this.data.nickname,
      this.chat.message = this.data.message,
      this.chat.sendDate=Date();

      this.chats.push(this.chat);
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }



}
