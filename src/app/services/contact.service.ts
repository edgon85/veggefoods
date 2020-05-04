import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private afs: AngularFirestore) {}

  public sendMessage(message: object) {
    const messageRef: AngularFirestoreCollection = this.afs.collection(
      'messages'
    );

    return messageRef.add(message);
  }
}
