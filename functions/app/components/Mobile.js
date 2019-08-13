import { FiMousePointer as MouseIcon } from "react-icons/fi"
import styled from "styled-components";

export default () =>
    <Mobile>
        <MouseIcon size={20}/>
        <br/>
        <br/>
        <br/>
            Write-Brite is a mouse thing
    </Mobile>

const Mobile = styled.div`

    display: none;

    @media only screen and (max-width: 1023px) {
        background: #CCC;
        width: 100vw;
        height: 100vh;
        display: block;
        padding-top: 25vw;
        font-family: monospace;
        text-align: center;
        color: #333;
        svg{
            stroke-width: 1px;
            stroke: #333;
        }
    }
`