import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Resource } from 'src/app/modals/resource';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-resourcesdropdown',
  templateUrl: './resourcesdropdown.component.html',
  styleUrls: ['./resourcesdropdown.component.scss'],
})
export class ResourcesdropdownComponent
  extends BaseComponent
  implements OnInit
{
  public filterResource: ReplaySubject<any> = new ReplaySubject<any>(1);
  private _onDestroy = new Subject<void>();
  public resourceFilterCtrl: FormControl = new FormControl();
  objResource = new Resource();
  resources = [];
  allUsers: any[];
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
    this.sharedservice
      .GetResourceName(this.authservice.UserName)
      .subscribe((resource) => {
        if (resource.StatusCode === 200) {
          this.filterResource.next(resource.response.slice());
          this.resources = resource.response;
          this.objResource = resource.response[0];
        }
      });
  }
  private filterresources() {
    if (!this.resources) {
      return;
    }
    // get the search keyword
    let search = this.resourceFilterCtrl.value;
    if (!search) {
      this.filterResource.next(this.resources.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the timezone
    this.filterResource.next(
      this.resources.filter(
        (filtrResources) => filtrResources.FirstName.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
