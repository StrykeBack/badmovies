import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedGenre: {}
    };
    this.getGenres = this.getGenres.bind(this);
    this.changeGenre = this.changeGenre.bind(this);
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios
      .get('/genres')
      .then((res) => {
        this.setState({
          genres: res.data.genres
        });
      })
      .catch((err) => {
        console.log('getGenres err: ', err);
      });
  }

  changeGenre(e) {
    console.log(e);
    var genreObj = {
      id: e.target.value,
      text: e.target.text
    };
    this.setState({
      selectedGenre: genreObj
    });
    console.log(genreObj);
    console.log(this.state);
    console.log(this.state.selectedGenre);
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    var genreList = this.state.genres.map((genre) => {
      return (
        <option value={genre.id} key={genre.id} name={genre.name}>
          {genre.name}
        </option>
      );
    });
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select
          onChange={this.changeGenre}
          value={this.state.selectedGenre.text}
        >
          <option defaultValue="Choose Here" selected disabled hidden>
          </option>

          {genreList}
        </select>
        <br />
        <br />

        <button onClick={(e) => this.props.getMovies(this.state.selectedGenre)}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
