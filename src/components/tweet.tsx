import styled from "styled-components";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;

const Username = styled.span`
    font-size: 15px;
    font-weight: 600;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;

const Createat = styled.div`
    color: white;
    font-size: 15px;
    font-weight: 600;
`;

export default function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
      </Column>
      <Column>
        <Createat></Createat>
      </Column>
      <Column>
        <Payload>{tweet}</Payload>
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}
