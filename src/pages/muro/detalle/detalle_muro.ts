import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'detalle_muro-master',
  templateUrl: 'detalle_muro.html'
})
export class Detalle_muroPage {


  constructor(public navCtrl: NavController,   public modalCtrl: ModalController) {

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }


  /**
   * Navigate to the detail page for this item.
   */

}
