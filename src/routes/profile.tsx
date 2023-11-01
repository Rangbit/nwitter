import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 22px;
`;

const UserLogo = styled.img`
  width: 50px;
`;

const Tweets = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const UserInput = styled.input``;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
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

const SubmitButton = styled.input`
  background-color: skyblue;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const NameForm = styled.form``;

export default function Profile() {
  const user = auth.currentUser;
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweet] = useState<ITweet[]>([]);
  const [newUsername, setNewUsername] = useState(user?.displayName);
  const onUpdate = () => {
    setEditing((prev) => !prev);
  };
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };
  const fetchTweets = async () => {
    const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map(doc => {
        const {tweet, createdAt, userId, username, photo} = doc.data();
        return {
            photo,
            tweet,
            userId,
            username,
            createdAt,
            id: doc.id,
          };
    });
    setTweet(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  const onUsernameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const {
      target : {value},
    } = event ;
    setNewUsername(value);
  };
  const onSubmit = async(event : React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if(user?.displayName !== newUsername){
      await updateProfile(user, {
        displayName : newUsername
      });
    }
  }
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {Boolean(avatar) ? (
          <AvatarImg src={avatar || "/user-logo.svg"} />
        ) : (
          <UserLogo src="/user-logo.svg" />
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      {editing ? 
      <>
      <NameForm onSubmit={onSubmit}>
        <UserInput type="text" value={newUsername || ''} onChange={onUsernameChange} />
        <ButtonBox>
          <SubmitButton type="submit" value="Update" />
          <UpdateButton onClick={onUpdate}>Cancel</UpdateButton>
        </ButtonBox>
      </NameForm>
      </>
      :
      <>
      <Name>{user?.displayName ?? "Anonymous"}</Name>
      <UpdateButton onClick={onUpdate}>Rename</UpdateButton>
      </>
      }
      <Tweets>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
      </Tweets>
    </Wrapper>
  );
}
