import MovieDB, { Configuration, Movie } from "moviedb-promise";
import env from "../environment";

const client = new MovieDB(env.apiKey);

let config: Configuration;

client.configuration().then(c => (config = c));

export class MovieApi {
  search(query: string) {
    return client
      .searchMovie({ query })
      .then(result => Object.assign(result, { results: fixProfilePaths(result.results) }));
  }

  popularMovies() {
    return client
      .miscPopularMovies()
      .then(result => fixProfilePaths(result.results));
  }
}

const fixProfilePaths = (movies: Movie[]) => {
  return movies.filter(movie => movie.poster_path).map(movie => {
    return Object.assign(movie, {
      poster_path: `${config.images.secure_base_url}/w500${movie.poster_path}`
    });
  });
};
