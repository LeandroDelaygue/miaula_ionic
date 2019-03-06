import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MicolegioPage } from './micolegio';

@NgModule({
  declarations: [
    MicolegioPage,
  ],
  imports: [
    IonicPageModule.forChild(MicolegioPage),
    TranslateModule.forChild()
  ],
  exports: [
    MicolegioPage
  ]
})
export class ListMasterPageModule { }
