import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WishesPage } from './wishes';

@NgModule({
  declarations: [
    WishesPage,
  ],
  imports: [
    IonicPageModule.forChild(WishesPage),
  ],
})
export class WishesPageModule {}
