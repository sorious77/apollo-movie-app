import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import Suggest from "../components/Suggest";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      language
      rating
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!) {
    likeMovie(id: $id) @client
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const SubTitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 80%;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const SuggestTitle = styled.div`
  margin-top: 30px;
  font-size: 30px;
`;

const Suggestions = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
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

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  const [likeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: +id },
  });

  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie.title}`}</Title>
        <SubTitle>
          {loading ? (
            <></>
          ) : (
            <>
              {data?.movie?.language} · ⭐{data?.movie.rating}
            </>
          )}
        </SubTitle>
        <Description>{data?.movie?.description_intro}</Description>
        <SuggestTitle>{data?.suggestions ? "Suggestions" : ""}</SuggestTitle>
        <Suggestions>
          {data?.suggestions?.map((suggest) => (
            <Suggest
              key={suggest.id}
              id={suggest.id}
              bg={suggest.medium_cover_image}
            />
          ))}
        </Suggestions>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}>
        {data?.movie ? (
          <LikeButton onClick={likeMovie}>
            {data?.movie?.isLiked ? "💖" : "🤍"}
          </LikeButton>
        ) : (
          <></>
        )}
      </Poster>
    </Container>
  );
};

export default Detail;
