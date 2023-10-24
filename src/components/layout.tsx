import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;

const Menu = styled.div``;

const MenuItem = styled.div``;

export default function Layout() {
    return (
        <Wrapper>
            <Menu>
                <MenuItem>
                
                </MenuItem>
                <MenuItem>
                
                </MenuItem>
                <MenuItem>
                
                </MenuItem>
            </Menu>
            <Outlet />
        </Wrapper>
    );
}