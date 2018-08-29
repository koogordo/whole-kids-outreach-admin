import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/Observable/fromPromise';

declare var $: any;
@Injectable()
export class ResponsiveService {
  xl: MediaQueryList;
  lg: MediaQueryList;
  md: MediaQueryList;
  sm: MediaQueryList;
  xs: MediaQueryList;
  @Output() screenQuery: EventEmitter<any> = new EventEmitter<any>();
  size: number;
  private sizeRef = {
    'xl': '1200px',
    'lg': '992px',
    'md': '768px',
    'sm': '576px',
    'xs': '575px'
  };

  constructor() {
      const win = $(window);
      this.size = win.width();

      $(window).resize(() => {
        this.size = win.width();
        this.screenQuery.emit(this.breakPoint());
    });
  }

  breakPoint(): number {
    let size = this.size;
    if (size >= 1200) {
      return 4;
    } else if (size >= 900) {
      return 3;
    } else if (size >= 400) {
      return 2;
    } else {
      return 1;
    }

  }


}
