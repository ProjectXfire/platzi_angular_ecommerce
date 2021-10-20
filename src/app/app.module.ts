// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// Providers
import { QuicklinkModule } from 'ngx-quicklink';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Interceptors
import { TimeInterceptor } from '@interceptors/time.interceptor';
import { TokenInterceptor } from '@interceptors/token.interceptor';
// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    QuicklinkModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
