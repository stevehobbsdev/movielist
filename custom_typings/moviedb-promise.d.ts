declare module 'moviedb-promise' {
  type SearchOptions = {
    query: string;
  }

  type Configuration = {
    images: {
      base_url?: string;
      secure_base_url?: string;
      poster_sizes?: string[];
    }
  }

  type Movie = {
    id?: number;
    overview?: string;
    popularity?: number;
    title?: string;
    vote_average?: number;
    vote_count?: number;
    release_date?: string;
    poster_path?: string;
  }

  type SearchResults = {
    page?: number;
    total_pages?: number;
    total_results?: number;
    results?: Array<Movie>;
  }

  export default class MovieDB {
    constructor(apiKey: string)

    searchMovie(options: SearchOptions): Promise<SearchResults>;
    miscPopularMovies(): Promise<SearchResults>;
    configuration(): Promise<Configuration>;
  }
}
