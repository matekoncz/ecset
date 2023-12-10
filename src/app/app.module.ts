import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProfileComponent } from './profile/profile.component';
import Backendless from 'backendless';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageBoardComponent } from './message-board/message-board.component';
import { serviceWorkerConfig } from 'src/wworker.config';

const APP_ID = 'E740B979-B083-ED0C-FFD3-2EDE3126C400';
const API_KEY = 'C1B30CED-2B0D-425D-BCD1-3A4C50A84765';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginFormComponent,
    ProfileComponent,
    MessageBoardComponent,
    ServiceWorkerModule.register(serviceWorkerConfig.serviceWorkerUrl, {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
