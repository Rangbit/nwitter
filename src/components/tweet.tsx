import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { ChangeEvent, useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
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

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  background-color: skyblue;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const UpdateSubmit = styled.input`
  background-color: skyblue;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const UpdateForm = styled.form``;

const UpdateTweet = styled.input``;


export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(tweet);
  const onUpdate = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (event : ChangeEvent<HTMLInputElement>) => {
    const {
      target : {value},
    } = event ;
    setNewNweet(value);
  }

  const onSubmit = async(event : React.FormEvent) => {
    event.preventDefault();
    console.log(tweet, id, newNweet);
    await updateDoc(doc(db, 'tweets', id), {tweet : newNweet});
    setEditing(false);
  }

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
      </Column>
      <Column>
        <Createat></Createat>
      </Column>
      {editing ? 
      <>  
        <UpdateForm onSubmit={onSubmit}>
          <Column>
            <UpdateTweet onChange={onChange} value={newNweet} />
          </Column>
          <Column>
            <DeleteButton>Cancel</DeleteButton>
            <UpdateSubmit type="submit" value="Update" />
          </Column>
        </UpdateForm>
      </> : 
      <>
        <Column>
          <Payload>{tweet}</Payload>
          {user?.uid === userId ? (
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          ) : null}
          {user?.uid === userId ? (
            <UpdateButton onClick={onUpdate}>Update</UpdateButton>
          ) : null}
        </Column>
        {photo ? (
          <Column>
            <Photo src={photo} />
          </Column>
        ) : null}
      </>}
    </Wrapper>
  );
}
