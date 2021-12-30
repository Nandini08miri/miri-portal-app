import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-resourcesdropdown',
  templateUrl: './resourcesdropdown.component.html',
  styleUrls: ['./resourcesdropdown.component.scss'],
})
export class ResourcesdropdownComponent extends BaseComponent implements OnInit {
  public filterResource: ReplaySubject<any> = new ReplaySubject<any>(1);
  private _onDestroy = new Subject<void>();
  public resourceFilterCtrl: FormControl = new FormControl();
  resoucres=[];
  allUsers:any[];
  constructor() {
    super();
   }

  ngOnInit() {
    this.GetResourceName();
    this.resourceFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterresources();
    });
  }
  GetResourceName() {
    this.sharedservice.GetResourceName(this.authservice.UserName).subscribe(data => {
      if (data.StatusCode === 200) {
        this.sharedservice.resource.next(data.response);
      } 
    });
  }
  private filterresources() {
    if (!this.resoucres) {
      return;
    }
    // get the search keyword
    let search = this.resourceFilterCtrl.value;
    if (!search) {
      this.filterResource.next(this.resoucres.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the timezone
    this.filterResource.next(
      this.resoucres.filter(resoucre => resoucre.FirstName.toLowerCase().indexOf(search) > -1)
    );
    
  }
}
