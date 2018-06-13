import { autoinject, bindable } from "aurelia-framework";
import { Movie as MovieModel } from "moviedb-promise";
import { WatchlistManager } from './../watchlist-manager';
import { AuthService } from './../auth-service';

@autoinject
export class Movie {
  @bindable model: MovieModel;
  isHovering = false;
  isInWatchlist = false;
  isAuthenticated = false;

  constructor(private watchlist: WatchlistManager, private auth: AuthService) {
    this.isAuthenticated = auth.isAuthenticated();

    auth.authNotifier.addListener('authChange', state => {
      this.isAuthenticated = state.authenticated;
    });
  }

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
