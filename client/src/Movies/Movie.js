import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import EditMovie from "../EditMovie/EditMovie";
import { Button, Grid, Modal } from "semantic-ui-react";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      modalOpen: false
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };
  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleEditedMovie = movie => {
    this.setState({ movie: movie });
    this.handleModalClose();
  };

  handleDeleteMovie = movieID => {
    axios
      .delete(`http://localhost:5000/api/movies/${movieID}`)
      .then(response => {
        if (response.data) {
          this.props.history.push("/");
        }
      })
      .catch(errors => {
        console.log(errors.response);
      });
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <>
        <Grid columns={2} container>
          <Grid.Row>
            <Grid.Column>
              <MovieCard movie={this.state.movie} />
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.saveMovie}>Save</Button>
              <Button onClick={this.handleModalOpen}>Edit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal
          closeIcon
          onClose={this.handleModalClose}
          open={this.state.modalOpen}
        >
          <Modal.Header>Edit Movie</Modal.Header>
          <Modal.Content>
            <EditMovie
              handleEditedMovie={this.handleEditedMovie}
              movie={this.state.movie}
            />
          </Modal.Content>
          <Modal.Actions>
            <Grid columns={2}>
              <Grid.Column textAlign="left">
                <Button
                  negative
                  onClick={() => this.handleDeleteMovie(this.state.movie.id)}
                >
                  Delete Movie
                </Button>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button onClick={this.handleModalClose}>Close</Button>
              </Grid.Column>
            </Grid>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
