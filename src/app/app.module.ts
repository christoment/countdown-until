import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountdownDisplayComponent } from './countdown-display/countdown-display.component';
import { CountdownInputComponent } from './countdown-input/countdown-input.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CountdownDisplayComponent,
    CountdownInputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
