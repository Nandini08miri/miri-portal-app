import { Component, OnInit } from '@angular/core';
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ActionSheetController, Platform } from "@ionic/angular";
import { BaseComponent } from '../../base.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage extends BaseComponent  implements  OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public actionSheetController: ActionSheetController
  ) {
    super();
    this.initializeApp();
  }
ngOnInit() {
    
}
  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Account',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Salary Details',
        role: 'destructive',
     
        handler: () => {
         window.location.href="/dashboard/salary";
        }
      }, {
        text: 'SalarySlip',
        
        handler: () => {
          window.location.href="/dashboard/salaryslip";
        }
      }, ]
    });
    await actionSheet.present();
  }
}
