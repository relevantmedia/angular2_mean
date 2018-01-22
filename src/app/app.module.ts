import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import {ServiceWorkerModule} from '@angular/service-worker';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
