import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  forma: FormGroup;

  emailValidaror = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';
  phoneValidator: string = `^((\\+91-?)|0)?[0-9]{8}$`;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario();
  }

  // <===============================================================> //
  // Creacion del formulario de checkout //
  // <===============================================================> //

  formulario() {
    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
          ),
        ],
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp('^[0-9]*$')),
          Validators.minLength(8),
          Validators.maxLength(8),
        ],
      ],
      tipo_producto: ['', Validators.required],
    });
  }

  sendInfo() {
    if (!this.forma.valid) {
      Swal.fire('Llene los campos requeridos');
      return;
    }
    console.log(this.forma.valid);
    console.log(this.forma.value);

    Swal.fire('¡Enviado!', 'Pronto nos comunicaremos con usted.', 'success');
    // this.forma.reset();
    this.forma.reset({
      nombre: '',
      email: '',
      telefono: '',
      tipo_producto: '',
    });
  }
}
