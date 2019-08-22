import React, { Component } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { Field, FieldArray } from "formik";
export default class EditMovieForm extends Component {
  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit}>
          <Form.Field>
            <label htmlFor="metascore">Title</label>
            <input
              name="title"
              value={this.props.values.title}
              onChange={this.props.handleChange}
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="metascore">Director</label>
            <input
              name="director"
              value={this.props.values.director}
              onChange={this.props.handleChange}
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="metascore">Metascore</label>
            <input
              name="metascore"
              value={this.props.values.metascore}
              onChange={this.props.handleChange}
              type="text"
            />
          </Form.Field>
          <p>
            <strong>Stars</strong>
          </p>
          <FieldArray
            name="stars"
            render={arrayHelpers => (
              <div>
                {this.props.values.stars.length > 0 &&
                  this.props.values.stars.map((star, index) => (
                    <div key={index}>
                      <Grid columns={3}>
                        <Grid.Row>
                          <Grid.Column width={6}>
                            <Field
                              name={`stars.${index}`}
                              placeholder="Name"
                              type="text"
                              value={star}
                            />
                          </Grid.Column>
                          <Grid.Column width={1}>
                            <Button
                              icon="minus"
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </Grid.Column>
                          {index === this.props.values.stars.length - 1 && (
                            <Grid.Column width={3}>
                              <Button
                                onClick={() => arrayHelpers.push("")}
                                primary
                              >
                                Add a Star
                              </Button>
                            </Grid.Column>
                          )}
                        </Grid.Row>
                      </Grid>
                    </div>
                  ))}
                <br />
              </div>
            )}
          />

          <Button type="submit">Edit Movie</Button>
        </Form>
      </div>
    );
  }
}
