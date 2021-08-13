import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroModule } from './ngzorro.module';
import { HeaderComponent } from './shared/components/header/header.component';

registerLocaleData(es);

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgZorroModule,
  ],
  providers: [AngularFirestore, { provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent],
})
export class AppModule {}
