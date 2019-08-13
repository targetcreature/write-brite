import col from "../styles/colors"
import styled from "styled-components"

export default ({ setColor }) =>
    <Wrap>

        <Palette>
            {
                Object.keys(col).map((c, i) => <Color key={`col_${i}`} color={col[c]} onClick={() => setColor(col[c])}/>)
            }
        </Palette>

    </Wrap>

const Wrap = styled.div`

    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;


`    

const Palette = styled.div`

    margin-right: 20px;
    border: 1px solid white;
    border-bottom: none;

`
const size = 60

const Color = styled.div`

    display: block;
    width: ${size}px;
    height: ${size}px;
    background: ${(props) => props.color};
    border-bottom: 1px solid white;
    cursor: pointer;

`