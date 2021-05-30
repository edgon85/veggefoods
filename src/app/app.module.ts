import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';

// routing
import { AppRoutingModule } from './app-routing.module';

// componentes
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

// modulos
import { SharedModule } from './shared/shared.module';

// angular fire2
/* import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database'; */

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisableControlDirective } from './directives/disable-control.directive';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

// locale
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { CurrecyFormatPipe } from './pipes/currecy-format.pipe';
registerLocaleData(es);

@NgModule({
  declarations: [AppComponent, LayoutComponent, DisableControlDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    /*     AngularFireAuthModule,
    AngularFireDatabaseModule, */
    BrowserAnimationsModule, // imports firebase/auth, only needed for auth features,
    NgxMaterialTimepickerModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
