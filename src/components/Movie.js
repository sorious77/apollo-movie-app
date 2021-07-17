import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!) {
    likeMovie(id: $id) @client
  }
`;

const Container = styled.div`
  height: 400px;
  postion: relative;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const LikeButton = styled.button`
  position: absolute;
  color: red;
  font-size: 20px;
  border-radius: 50%;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const Movie = ({ id, bg, isLiked }) => {
  const [likeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: +id },
  });

  return (
    <Container>
      <LikeButton onClick={likeMovie}>{isLiked ? "💖" : "🤍"}</LikeButton>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
    </Container>
  );
};

export default Movie;
