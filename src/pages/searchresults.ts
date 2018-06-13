import { autoinject } from "aurelia-dependency-injection";
import { MovieApi } from "./../api/index";
import { Movie, SearchResults as Results } from "moviedb-promise";

@autoinject
export class Search {
  searchTerm: string;
  header: string = 'Your search results';
  results: Results;
  isLoading = false;

  constructor(private api: MovieApi) {}

  async activate(args: { term: string }) {
    this.searchTerm = args.term;
    this.isLoading = true;
    this.results = null;

    this.results = await this.api.search(this.searchTerm);

    this.header = this.results.total_results > 0
      ? `Found ${this.results.total_results} movies that matched "${this.searchTerm}"`
      : `Didn't find any results for "${this.searchTerm}"`;

    this.isLoading = false;
  }
}
