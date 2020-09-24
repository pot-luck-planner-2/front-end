import styled from 'styled-components';
import theme from '../theme';

export const SideBar = styled.nav`
    width: 300px;
    max-width: 230px;
    height: 100vh;
    background-color: ${theme.colors.primary.darkBlue};
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const SideBarItem = styled.div`
    border-right: ${props => props.active ? `5px solid ${theme.colors.secondary.darkPurple}` : 'none'};
    display: flex;
    padding-left: 20px;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    cursor: pointer;
    p {
        margin: 0;
        font-family: ${theme.font.family};
        color: ${theme.colors.neutral.white};
        font-weight: 500;
        font-size: 20px;
    }
    &:hover{
        background-color: ${theme.colors.primary.lightBlue};
        transition: .5s ease;
    }
`;

export const Dashboard = styled.section`
    display: flex;
`;

export const WelcomeView = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        font-family: ${theme.font.family};
        font-size: 60px;
    }
    p {
        font-family: ${theme.font.family};
        font-size: 20px;
        color: ${theme.colors.neutral.grey};
    }
`;

export const Button = styled.div`
    padding: 10px 20px;
    border-radius: 5px;
    background-color: ${theme.colors.primary.darkBlue};
    cursor: pointer;
    p {
        color: ${theme.colors.neutral.white};
        font-family: ${theme.font.family};
        font-size: 20px;
        margin: 0;
    }
    &:hover{
        background-color: ${theme.colors.primary.lightBlue};
        transition: .5s ease;
    }
`;
