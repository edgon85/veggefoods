import { Component, OnInit } from '@angular/core';
import { NgForm, FormArray } from '@angular/forms';
import { ContactService } from '../../../../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  info: any = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  contactInfo: any;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService
      .getContact('contact')
      .subscribe((resp) => (this.contactInfo = resp));
  }

  onSubmit(forma: NgForm) {
    const date = new Date();
    if (forma.invalid) {
      return;
    }

    const data = {
      name: forma.value.name.toString(),
      email: forma.value.email.toString(),
      subject: forma.value.subject.toString(),
      message: forma.value.message.toString(),
      date: date.toString(),
    };

    this.contactService
      .sendMessage(data)
      .then((resp) => {
        Swal.fire(
          'Mensaje enviado!',
          'Pronto nos comunicaremos con usted',
          'success'
        );
        forma.reset();
      })
      .catch((err) => Swal.fire('OOOPS!', 'ocurrio un error', 'error'));
  }
}
