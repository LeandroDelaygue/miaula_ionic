import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutoresPage } from './tutores';

@NgModule({
  declarations: [
    TutoresPage,
  ],
  imports: [
    IonicPageModule.forChild(TutoresPage),
  ],
})
export class TutoresPageModule {}
