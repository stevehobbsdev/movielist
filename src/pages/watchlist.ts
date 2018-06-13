import { Router } from 'aurelia-router';
import { Movie } from './../components/movie';
import { autoinject } from "aurelia-framework";
import { WatchlistManager } from '../watchlist-manager';

@autoinject
export class Watchlist {
  hasMovies: boolean;

  constructor(private watchlist: WatchlistManager, private router: Router) {
    this.hasMovies = watchlist.get().length > 0;

    const handler = (movie, list) => this.hasMovies = list.length > 0;

    this.watchlist.notifier.addListener('movie:removed', handler);
  }
}
