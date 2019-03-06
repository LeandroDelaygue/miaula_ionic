import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { Detalle_muroPage } from './detalle_muro';

@NgModule({
  declarations: [
    Detalle_muroPage,
  ],
  imports: [
    IonicPageModule.forChild(Detalle_muroPage),
    TranslateModule.forChild()
  ],
  exports: [
    Detalle_muroPage
  ]
})
export class ListMasterPageModule { }
