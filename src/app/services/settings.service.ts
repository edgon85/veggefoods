import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private afs: AngularFirestore) {}

  // obtener lo mas tropnto posible
  public getProntoPosible() {
    return this.afs.doc(`settings/pronto_posible`).valueChanges();
  }
}
