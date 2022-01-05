import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

  public async notify(title: string, text: string, callback?: any, context?: any) {
    const alert = await this.alertController.create({
      cssClass: 'alert-fulbo',
      header: title,
      message: text,
      buttons: [callback ?{
        text: 'OK',
        id: 'confirm-button',
        handler: () => {
          callback(context);
        }
      } : 'OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  public async confirm(title: string, text: string, callback: any, context: any, args?: any) {
    const alert = await this.alertController.create({
      cssClass: 'alert-fulbo',
      header: title,
      //subHeader: 'Subtitle',
      message: text,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {}
        }, {
          text: 'Si',
          id: 'confirm-button',
          handler: () => {
            callback(context, args);
          }
        }
      ]
    });

    await alert.present();
  }
}
