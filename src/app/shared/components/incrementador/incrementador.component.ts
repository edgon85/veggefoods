import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.scss']
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress', { static: false }) txtProgress: ElementRef;

  // tslint:disable-next-line: no-input-rename
  @Input('progresoIncrementador') progreso: number = 1;

  // tslint:disable-next-line: no-output-rename
  @Output('actualizaValor') cambioValor: EventEmitter<
    number
  > = new EventEmitter();

  constructor() {
    //  console.log('prgreso: ', this.progreso);
  }

  ngOnInit() {}

  onChages(newValue: number) {
    if (newValue >= 50) {
      this.progreso = 50;
    } else if (newValue <= 1) {
      this.progreso = 1;
    } else {
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    // this.txtProgress.nativeElement.focus();  // <=== para ponerlo en focus

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 50 && valor > 0) {
      this.progreso = 50;
      return;
    }

    if (this.progreso <= 1 && valor < 1) {
      this.progreso = 1;
      return;
    }

    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);

    // this.txtProgress.nativeElement.focus();
  }
}
