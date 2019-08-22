import React from "react";
import { Card, Grid } from "semantic-ui-react";
import EditMovie from "../EditMovie/EditMovie";
const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>Metascore: {metascore}</Card.Meta>
        <Card.Description>
          <p>Director: {director}</p>
          <strong>Stars</strong>
          <ul>
            {stars.map(star => (
              <li key={star}>{star}</li>
            ))}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default MovieCard;
