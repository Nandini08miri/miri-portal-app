import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class SpinnerService {

    loader = new BehaviorSubject<boolean>(false);
    loaderState = this.loader.asObservable();
    constructor() {}
}
