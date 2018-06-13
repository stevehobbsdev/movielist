import { autoinject, bindable } from "aurelia-framework";
import { Movie as MovieModel } from "moviedb-promise";
import { WatchlistManager } from './../watchlist-manager';

@autoinject
export class Movie {
  @bindable model: MovieModel;
  isHovering = false;
  isInWatchlist = false;

  constructor(private watchlist: WatchlistManager) {}

  mouseOver() {
    this.isHovering = true;
  }

  mouseOut() {
    this.isHovering = false;
  }

  bind() {    
    this.isInWatchlist = this.watchlist.isAdded(this.model);    
  }

  addMovie(movie: MovieModel) {
    this.watchlist.add(movie);
    this.isInWatchlist = true;
  }

  removeMovie(movie: MovieModel) {
    this.watchlist.remove(movie);
    this.isInWatchlist = false;
  }
}
