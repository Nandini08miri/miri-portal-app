import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AppInjectorService {

  private static injector: Injector;
  static setInjector(injector: Injector) {
    AppInjectorService.injector = injector;
      }
  static getInjector(): Injector {
  return AppInjectorService.injector;
      }

}
