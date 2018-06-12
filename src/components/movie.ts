import { autoinject, bindable } from 'aurelia-framework';
import { Movie as MovieModel } from 'moviedb-promise';

export class Movie {
  @bindable model: MovieModel;
  isHovering = false;

  mouseOver() {
    this.isHovering = true;
  }

  mouseOut() {
    this.isHovering = false;
  }
}
