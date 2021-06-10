import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private afs: AngularFirestore) {}
  // private itemsCollection: AngularFirestoreCollection;
  // items: Observable<any>;
  public sendMessage(message: object) {
    const messageRef: AngularFirestoreCollection = this.afs.collection(
      'messages'
    );

    return messageRef.add(message);
  }

  // getContactnumbers() {
  //   this.itemsCollection = this.afs.collection('contacts');
  //   this.items = this.itemsCollection.valueChanges();

  //   return this.items;
  // }

  // ================================================================ //
  // Obtener datos de contacto //
  // ================================================================ //
  getContact(contact: string) {
    return this.afs.doc<any>(`contacts/${contact}`).valueChanges();
  }
}
