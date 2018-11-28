import { Injectable } from "@angular/core";
import { FirebaseApp } from 'angularfire2';
// I am importing simple ionic storage (local one), in prod this should be remote storage of some sort.
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {AlertController} from "ionic-angular";



@Injectable()
export class ServicioMensajeria {

  private messaging: firebase.messaging.Messaging;
  private unsubscribeOnTokenRefresh = () => {};



currentMessage = new BehaviorSubject(null)
  constructor(
    private storage: Storage,
    private app: FirebaseApp,
    private alertCtrl: AlertController
  ) {




   // this.messaging = app.messaging;
    this.messaging = firebase.messaging(app);

    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      this.messaging.useServiceWorker(registration);


      //this.disableNotifications()
      this.enableNotifications();

    });
  }

  public enableNotifications() {
    console.log('Requesting permission...');
    return this.messaging.requestPermission().then(() => {
      console.log('Permission granted');
      // token might change - we need to listen for changes to it and update it
      this.setupOnTokenRefresh();
      return this.updateToken();
    });
  }


  public subscribeTokenToTopic(token, topic, clave) {
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'key='+clave
      })
    }).then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
      }
      console.log('Subscribed to "'+topic+'"');
    }).catch(error => {
      console.log(error);
    })
  }


  public disableNotifications() {
    this.unsubscribeOnTokenRefresh();
    this.unsubscribeOnTokenRefresh = () => {};
    return this.storage.set('fcmToken','').then();
  }

  public receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);




        let alert = this.alertCtrl.create({
        title: payload.data["gcm.notification.titulo"] ,
        subTitle:  payload.data["gcm.notification.mensaje"],
        buttons: ['Entendido']
      });
      alert.present();
      this.currentMessage.next(payload)
    });
  }

  private updateToken() {
    return this.messaging.getToken().then((currentToken) => {
      if (currentToken) {
        // we've got the token from Firebase, now let's store it in the database
        console.log(currentToken)

        this.subscribeTokenToTopic(currentToken,"miaula","AAAAC62jtxU:APA91bFLFIEGNsdctKnaY_aE0F-zFBT2TCctGKm6ou2NCtbjRx66vY5YVFmtGAdcFzYR_rtLwo4xsB9aGptuDmhZemmpOXYyXu1ZGSJR1EksRIA4Khn_KrOTgWgA3BMdA4LtDor7diMR")

        return this.storage.set('fcmToken', currentToken);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    });
  }

  private setupOnTokenRefresh(): void {
    this.unsubscribeOnTokenRefresh = this.messaging.onTokenRefresh(() => {
      console.log("Token refreshed");
      this.storage.set('fcmToken','').then(() => { this.updateToken(); });
    });
  }

}
