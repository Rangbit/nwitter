import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    width: 100%;
    background-color: white;
    color: black;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    cursor: pointer;
`;

const Logo = styled.img`
    height: 25px;
    margin-right: 10px;
`;

export default function GithubButton() {
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provieder = new GithubAuthProvider();
            await signInWithPopup(auth, provieder);
            // await signInWithRedirect(auth, provieder);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }
    return (
    <Button onClick={onClick}>
        <Logo src="/github-logo.svg" />
        Continue with Github
    </Button>
    );
}

