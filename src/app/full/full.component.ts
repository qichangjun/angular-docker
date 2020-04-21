import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MenuItems } from '../share/class/menu-items/menu-items';
import { EventService } from '../core/services/event.service';
/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['full.component.scss'],
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green: boolean;
  blue: boolean;
  dark: boolean;
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  showHide: boolean;
  sidebarOpened;
  @ViewChild('snav') snavbar: any;
  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItems,private _EventService: EventService,) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {
    //This is for the topbar search
    //  (<any>$(".srh-btn, .cl-srh-btn")).on('click', function () {
    //         (<any>$(".app-search")).toggle(200);
    //     });
    //This is for the megamenu

  }

  goToSearch(){
    // window.open(`http://${window.location.host}/search`)
  }


  // Mini sidebar


}
