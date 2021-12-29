import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { NgModule,Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptorService } from '../app/core/services/api-interceptor.service';
import { AppInjectorService } from './core/services/app-injector.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true
  },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjectorService.setInjector(this.injector);
  }
}
