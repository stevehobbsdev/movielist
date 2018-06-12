import { Movie } from "moviedb-promise";
import { MovieApi } from './../api/index';
import { autoinject } from "aurelia-framework";

@autoinject
export class PopularMovies {    
  movies: Movie[];
  
  constructor(private api: MovieApi) {
  }

  async attached() {
    this.movies = await this.api.popularMovies()
  }
}
