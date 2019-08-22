import React, { Component } from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import axios from "axios";
import EditMovieForm from "./EditMovieForm";

export default class EditMovie extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            id: this.props.movie.id,
            title: this.props.movie.title,
            director: this.props.movie.director,
            metascore: this.props.movie.metascore,
            stars: this.props.movie.stars
          }}
          onSubmit={(values, action) => {
            axios
              .put(
                `http://localhost:5000/api/movies/${this.props.movie.id}`,
                values
              )
              .then(response => {
                //console.log(response.data);
                this.props.handleEditedMovie(response.data);
              })
              .catch(errors => {
                console.log(errors);
              });
            console.log(values);
          }}
          render={props => <EditMovieForm {...props} />}
        />
      </div>
    );
  }
}
