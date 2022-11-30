import styled, { keyframes } from 'styled-components';

const colors = {
    "blue" : "#5285EC",
    "white" : "#FFF",
    "lightgray" : "#8F9EA2",
    "gray" : "#537178"
}

//animations - start
const grow = keyframes`
    from {
        opacity: 0;
        transform: scale(0, 0);
    }
    to {
        opacity: 1;
        transform: scale(1, 1);
    }
`;

const move = keyframes`
    from {
        transform: translateX(0px)
    }
    to {
        transform: translateX(45px)
    }
`;

const skeletonKeyframes = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;//end

export const Avatar = styled.div`
    width: 48px;
    height: 48px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    img {
        height: inherit;
    }
`

export const Card = styled.div`
    animation: ${fadeIn} ${props => props.second || 1}s;
    background-color: ${colors.white};
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: ${ props => props.gap || "unset" }
` 

export const Button = styled.button`
    background-color: ${colors.blue};
    border-radius: 8px;
    border: unset;
    color: ${colors.white};
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
    background-color: ${colors.white};
    box-shadow: 0px 3px 6px #00000029;
    display: flex;
    height: 72px;
    justify-content: center;
    .content {
        width: 960px; 
        display: flex;
        align-items: center;
        justify-content: space-between;
        .profile {
            align-items: center;
            display: flex;
            gap: 16px;
        }
    }
    @media (max-width: 960px) {
        padding: 0 24px;
    }
    span {
        color: #6D8187;
        font-size: 16px;
        font-weight: 500;
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
    position: fixed;
    top: 0;
    transition: opacity 500ms;
    width: 100%;
    @media (max-width: 576px) {
        height: calc(100vh + 72px);
        align-items: flex-start;
        ${Card} {
            margin-top: 84px;
        }
    }
`

export const Title = styled.label`
    color: ${colors.gray};
    font-size: 20px;
    font-weight: 500;
`

export const List = styled.ul`
    color: ${colors.lightgray};
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
        color: ${colors.blue};
        &.strike {
            span {
                color: ${colors.gray};
                text-decoration: line-through;
            }
        }
        span {
           line-break: anywhere; 
        }
    }
    .list {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        label {
            cursor: pointer;
        }
        input[type=checkbox] {
            position: relative;
            border: 2.5px solid #95A4AB;
            border-radius: 4px;
            background: none;
            cursor: pointer;
            line-height: 0;
            outline: 0;
            padding: 0 !important;
            vertical-align: text-top;
            height: 19px;
            min-width: 19px;
            -webkit-appearance: none;
        }
        input[type=checkbox]:checked:before {
            content: '';
            position: absolute;
            right: 30%;
            top: 20%;
            width: 5px;
            height: 15px;
            border: solid #707070;
            border-width: 0 3.5px 3.5px 0;
            margin: -1px -1px 0 -1px;
            transform: rotate(45deg) translate(-50%, -50%);
            z-index: 2;
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
    overflow-x: hidden;
`

export const FlexCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    &.h-100 {
        height: 100%;
        padding: 24px 0;
    }
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
        height: calc(100vh - 84px);
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
        .count {
            font-weight: 500;
            span:nth-child(1) {
                color: ${colors.blue};
                font-size: 64px;
            }
            span:nth-child(2) {
                color: ${colors.lightgray};
                font-size: 20px;
            }
        }
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
        @media (max-width: 960px) {
            margin-left: 24px;
            margin-right: 24px;
        }
    }
    @media (max-width: 960px) {
        width: 100%;
        ${Card} {
            margin: 0 24px;
        }
    }
    @media (max-width: 650px) {
        ${Card} {
            border-radius: 0;
            width: 100%;
            margin: 0;
        }
        .title {
            margin: 29px 16px 15px 15px;
            flex-direction: column;
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

export const ErrorMessage = styled.span`
    color: #ef4444;
    font-size: 12px;
    font-weight: 600;
    line-height: 0;
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

export const LoadContainer = styled(FlexCenter)`
    min-height: inherit;
    .container {
        height: 15px;
        width: 105px;
        display: flex;
        position: relative;
        .circle {
            background: ${colors.blue};
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: $primary-color;
            animation: ${move} 500ms linear 0ms infinite;
            margin-right: 30px;
            &:first-child {
                position: absolute;
                top: 0;
                left: 0;
                animation: ${grow} 500ms linear 0ms infinite;
            }
            &:last-child {
                position: absolute;
                top: 0;
                right: 0;
                margin-right: 0;
                animation: ${grow} 500ms linear 0s infinite reverse;
            }
        }
    }
`