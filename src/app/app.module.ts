import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { NetworkRequestInterceptor } from './intercepters/network-request.interceptor';
import { environment } from 'src/environments/environment';
import { NgPipesModule } from 'ngx-pipes';
import { JSON2CSV } from './core/services/json2csv';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    NgPipesModule,
    NgxImageZoomModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    CookieService,
    JSON2CSV,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkRequestInterceptor,
      multi: true
    },

    {
      provide: ErrorHandler
    }
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
