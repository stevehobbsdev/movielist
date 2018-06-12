import { Movie } from "moviedb-promise";
import { bindable } from "aurelia-framework";

export class MovieList {
  @bindable movies: Movie[];
  @bindable title: string;
}
