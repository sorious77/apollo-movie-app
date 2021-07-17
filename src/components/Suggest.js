import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  margin-right: 10px;
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

const Suggest = ({ id, bg }) => {
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
    </Container>
  );
};

export default Suggest;