import styled, { keyframes } from 'styled-components';

const modalPopupAnimation = keyframes`
    0% { margin-top: -200px; }
    100% { margin-top: 0px; }
`

const skeletonKeyframes = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`;

export const Avatar = styled.img`
    border-radius: 100%;
    height: 48px;
    width: 48px;
`

export const Card = styled.div`
    background-color: #FFF;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    &.modal {
        animation-name: ${modalPopupAnimation};
        animation-duration: 1500ms;
    }
` 

export const Button = styled.button`
    background-color: #5285EC;
    border-radius: 8px;
    border: unset;
    color: #FFF;
    font-size: 14px;
    height: 40px;
    padding: 11px 22px;
    width: fit-content;
    &.full { width: 100%; }
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`

export const Input = styled.input`
    background-color: #EEF1F8;
    border: unset;
    border-radius: 8px;
    font-size: 14px;
    height: 40px;
    text-indent: 12px;
    width: 244px;
    &::placeholder {
        color: #7A7D7E;
    }
`

export const Navbar = styled.div`
    align-items: center;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px #00000029;
    display: flex;
    padding: 0 120px;
    @media (max-width: 768px) {
        padding: 0 24px;
    }
    height: 72px;
    justify-content: space-between;
    span {
        color: #6D8187;
        font-size: 16px;
    }
    .link:hover {
        cursor: pointer;
        opacity: 0.6;
    }
`

export const ModalContainer = styled.div`
    align-items: center;
    background-color: #00000033;
    visibility: ${ props => props.show ? "visible" : "hidden" };
    display: flex;
    opacity: ${ props => props.show ? 1 : 0 };
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    transition: opacity 500ms;
    width: 100%;
    @media (max-width: 576px) {
        align-items: flex-start;
        ${Card} {
            margin-top: 84px;
        }
    }
`

export const Title = styled.span`
    color: #537178;
    font-size: 20px;
    font-weight: 500;
`

export const List = styled.ul`
    color: #8F9EA2;
    font-size: 14px;
    list-style-position: inside;
    padding-left: 0;
    li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.strike {
            text-decoration: line-through;
        }
    }
`

export const CheckList = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 24px;
    padding: 24px 0;
    ${Title} {
        color: #5285EC;
        &.strike {
            color: #537178;
            text-decoration: line-through;
        }
    }
    .list {
        display: flex;
        width: 100%;
        input, span {
            cursor: pointer;
        }
    }
    .action{ 
        width: 60px;
        img:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }
`

export const Body = styled.div`
    background-color: #F4F4F6;
`

export const NoTask = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-top: -72px;
    ${Card} {
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    @media (max-width: 576px) {
        align-items: flex-start;
        margin-top: 12px;
        ${Card} {
            border-radius: 0;
            width: 100%;
        }
    }
`

export const WithTask = styled.div`
    padding: 24px 0;
    min-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 650px) {
        padding: 12px 0;
    }
`

export const TaskTop = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    ${Card} {
        padding: 24px 24px 28px 24px;
        height: 110px;
        width: 256px;
    }
    @media (max-width: 960px) {
        align-items: center;
    }
    @media (max-width: 650px) {
        ${Card} {
            border-radius: 0;
            width: 100%;
        }
    }
`

export const SearchInput = styled.div`
    align-items: center;
    display: flex;
    position: relative;
    ${Input} {
        padding-left: 40px;
        text-indent: 0px;
    }
    img {
        padding-left: 15px;
        position: absolute;
    }
`

export const TaskBottom = styled.div`
    display: flex;
    flex-direction: column;
    width: 960px;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 34px;
        margin-bottom: 10px;
        .action {
            ${Input} {
                background-color: #D9DFEB;
            }
            display: flex;
            gap: 12px;
        }
    }
    @media (max-width: 960px) {
        width: 100%;
    }
    @media (max-width: 650px) {
        ${Card} {
            border-radius: 0;
            width: 100%;
        }
        .title {
            margin-top: 29px;
            margin-bottom: 16px;
            flex-direction: column;
            padding: 0 15px;
            .action {
                flex-direction: column;
                margin-top: 8px;
                width: 100%;
                ${SearchInput}, ${Input}, ${Button} {
                    width: inherit;
                }
            }
        }
    }
`

export const Skeleton = styled.div`
    height: ${props => props.height};
    width: ${props => props.width};
    display: inline-block;
    background-color: #eee;
    background-image: linear-gradient(
        90deg,
        #eee,
        #f5f5f5,
        #eee
    );
    animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
    background-size: 200px 100%;
    background-repeat: no-repeat;
    border-radius: 4px;
    margin-bottom: 8px;
`