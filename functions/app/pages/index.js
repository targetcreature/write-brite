import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import useSize from "@rehooks/component-size"

import Mobile from "../components/Mobile"
import Menu from "../components/Menu"
import Palette from "../components/Palette"

import col from "../styles/colors"

export default () =>
    <div>
        <Mobile/>
        <App/>
    </div>

const App = () => {

    const [text, setText] = useState(() => {
        const initText = "Here we are,  sitting on a bed in the back corner of the library, staring at the ceiling while looking at books. The window isn't open yet, but it looks very much like one we could see on my computer screen. I think the night sky is a bright blue, maybe orange, in that direction. Or maybe yellow... We are only about 30 feet away by now. We are going to be staring at a huge room. About six or seven stories high. The walls aren't painted, but there are curtains on the windows. So when the light of a torch hits the ceiling, there is a slight reflection. I don't know if this effect is the same on all windows or only on these windows that are on the higher ceilings. It would be nice if we could see through the curtains or the curtains, just as we can read books on the bookshelf. That'd be neat. In any case, I don't know what we are going to be reading in the library. I'm just curious about reading. I'm not sure exactly. Maybe we are going to be reading  The Life and Adventures of Captain James Cook , on a large stack of books stacked in boxes. In those books is the story of the expedition to the Pacific Ocean by Captain James Cook, where we found gold."
        const initSplit = initText.split(" ")
        return initSplit
    })

    const [clear, setClear] = useState(false)

    const containerRef = useRef()
    const containerSize = useSize(containerRef)

    const [border, setBorder] = useState(true)
    const [center, setCenter] = useState(true)
    const [backlight, setBacklight] = useState(false)

    const [color, setColor] = useState(col[Object.keys(col)[0]])

    const menuProps = {
        border, setBorder, center, setCenter, backlight, setBacklight, clear, setClear, setText, containerRef
    }

    return (
        <BGWrap border={border} center={center}>
            <Wrap border={border} center={center}>

                <Menu props={menuProps}/>

                <Palette setColor={setColor}/>

                <Container ref={containerRef} size={containerSize} border={border} center={center}>
                    {
                        text.map((word, idx) => {
                            return <Word key={`${word}__${idx}`} word={word} clear={clear} backlight={backlight} color={color} />
                        })
                    }
                </Container>

            </Wrap>
        </BGWrap>
    )
}

const BGWrap = styled.div`

    background: ${(props) => props.border ? "#CCC" : "white"};
    padding-top: ${(props) => props.center ? "40px" : "none"};
    padding-bottom: ${(props) => props.center ? "40px" : "none"};
    overflow-x: hidden;
    transition: background .5s;

`

const Wrap = styled.div`

    display: flex;
    justify-content: ${(props) => props.center ? "center" : "flex-start"};
    align-items: ${(props) => props.center ? "center" : "flex-start"};
    width: 100vw;
    min-height: 100vh;

    @media only screen and (max-width: 1023px) {

        display: none;

    }

`

const Container = styled.div`

    background: #000;
    cursor: none;
    border: 1px solid;
    border-color: ${(props) => props.border ? "black" : "transparent"};
    border-top-color: ${(props) => props.center ? props.border ? "black" : "transparent" : "transparent"};
    width: 30vw;
    /* max-height: 75vh; */
    padding: 40px;
    /* overflow-y: auto; */
    /* box-sizing: border-box; */
    font-family: monospace;
    margin-bottom: 80px;

    @media only screen and (max-width: 1023px) {

        width: 60vw;
        max-height: 50vh;
        
    }


    @media print{
        border-color: ${(props) => props.border ? "black" : "transparent"};
        width: ${(props) => props.size.width}px;
        height: ${(props) => props.size.height}px;
        margin: ${(props) => props.center ? "auto" : "initial"};
        overflow-y: visible;
        box-sizing: border-box;

    }


`

const Word = ({ word, clear = false, backlight, color }) => {

    const [pinned, setPinned] = useState(false)
    const [hover, setHover] = useState(false)
    const [col, setCol] = useState(null)

    useEffect(() => setPinned(false), [clear])

    return (
        <WordStyle
            pinned={pinned}
            onClick={() => {
                pinned ? 
                    color === "black" ?
                        setPinned(false)
                        :
                        setCol(color)
                    : (
                        setCol(color),
                        setPinned(true)
                    )

            }}
            onMouseEnter={() => pinned ? setHover(true) : null}
            onMouseLeave={() => pinned ? setHover(false) : null}
            hover={hover}
            backlight={backlight}
            color={col || color}
        >{word}</WordStyle>
    )
}

const WordStyle = styled.div`

    margin: 0px 10px 0px 0px;
    display: inline-block;
    color: ${(props) => props.color === "black" ? "gray" : props.color};
    opacity: ${(props) => props.pinned ? props.color === "black" ? 0 : 1 : props.backlight ? 0.20 : 0};

    &:hover{
        opacity: ${(props) => props.hover ? 0.5 : 1};
    }
    
`
