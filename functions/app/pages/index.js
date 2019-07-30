import { useState, useEffect, useRef } from "react"
import ReactToPrint from "react-to-print"
import styled from "styled-components"
import { FiClipboard as Clipboard } from "react-icons/fi"
import { FiPrinter as PrintIcon } from "react-icons/fi"
import useSize from "@rehooks/component-size"

export default () => {

    const [text, setText] = useState(() => {
        const initText = `Here we are,  sitting on a bed in the back corner of the library, staring at the ceiling while looking at books. The window isn't open yet, but it looks very much like one we could see on my computer screen. I think the night sky is a bright blue, maybe orange, in that direction. Or maybe yellow... We are only about 30 feet away by now.
        We are going to be staring at a huge room. About six or seven stories high. The walls aren't painted, but there are curtains on the windows. So when the light of a torch hits the ceiling, there is a slight reflection. I don't know if this effect is the same on all windows or only on these windows that are on the higher ceilings. It would be nice if we could see through the curtains or the curtains, just as we can read books on the bookshelf. That'd be neat. In any case, I don't know what we are going to be reading in the library. I'm just curious about reading. I'm not sure exactly.
        Maybe we are going to be reading  The Life and Adventures of Captain James Cook , on a large stack of books stacked in boxes. In those books is the story of the expedition to the Pacific Ocean by Captain James Cook, where we found gold.`
        const initSplit = initText.split(" ")
        return initSplit
    })

    const [clear, setClear] = useState(false)

    const pasteHandler = () =>
        navigator.clipboard.readText().then(
            (clipText) => setText(() => {
                const newText = clipText.split(" ")
                return newText
            }))

    const clearHandler = () => setClear((c) => !c)

    const containerRef = useRef()
    const containerSize = useSize(containerRef)

    const [border, setBorder] = useState(true)
    const [center, setCenter] = useState(true)

    console.log(containerSize)

    return (
        <Wrap border={border} center={center}>

            <Menu>
                <Option onClick={pasteHandler}><Clipboard size={30} /><OptionText>PASTE</OptionText></Option>
                <Option onClick={clearHandler}><Clear /><OptionText>CLEAR</OptionText></Option>
                <ReactToPrint
                    trigger={() =>
                        <Option><PrintIcon size={30} /><OptionText>PRINT</OptionText></Option>
                    }
                    content={() => containerRef.current}
                />

                <PrintOptions>

                    <PrintOption onClick={() => setBorder((b) => !b)}>
                        <CheckBox type="checkbox" readOnly checked={border} /> BORDER
                    </PrintOption>

                    <PrintOption onClick={() => setCenter((b) => !b)}>
                        <CheckBox type="checkbox" readOnly checked={center} /> CENTERED
                    </PrintOption>

                </PrintOptions>

            </Menu>

            <Container ref={containerRef} size={containerSize} border={border} center={center}>
                {
                    text.map((word, idx) => {
                        return <Word key={`${word}__${idx}`} word={word} clear={clear} />
                    })
                }
            </Container>

        </Wrap>
    )
}

const Menu = styled.div`
    display: flex;
    align-items: flex-end;
    position: fixed;
    bottom: 20px;
    left: 20px;
    font-family: monospace;
`

const Clear = styled.div`
        width: 15px;
        height: 25px;
        border: 1px solid #333;
        border-radius: 5px;
        transform: rotate(15deg);
`

const Option = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    padding-right: 10px;
    color: #333;
    svg{
      stroke: #333;
      stroke-width: 1px;
    }
    cursor: pointer;
`
const OptionText = styled.div`

    margin-top: 5px;

`

const PrintOptions = styled.div`

    display: inline-flex !important;
    flex-direction:column;
    padding: 20px;
    padding-left: 10px;
    color: #333;
    svg{
      fill: #333;
    }
    div{
        cursor: default;
    }

`
const PrintOption = styled.div`

`

const CheckBox = styled.input`
    margin-right: 0;
`

const Wrap = styled.div`

    background: ${(props) => props.border ? "#CCC" : "white"};
    display: flex;
    justify-content: ${(props) => props.center ? "center" : "flex-start"};
    align-items: ${(props) => props.center ? "center" : "flex-start"};
    width: 100vw;
    height: 100vh;
    transition: background .5s;

`

const Container = styled.div`

    background: white;
    cursor: none;
    border: 1px solid;
    border-color: ${(props) => props.border ? "black" : "transparent"};
    width: 30vw;
    max-height: 75vh;
    padding: 40px;
    overflow-y: auto;
    /* box-sizing: border-box; */


    @media print{
        border-color: ${(props) => props.border ? "black" : "transparent"};
        width: ${(props) => props.size.width}px;
        height: ${(props) => props.size.height}px;
        /* margin: ${(props) => props.center ? "auto" : "initial"}; */
        overflow-y: visible;
        box-sizing: border-box;

    }


`

/* 

 convert to PNG then print that I guess :(

*/

const Word = ({ word, clear = false }) => {

    const [pinned, setPinned] = useState(false)
    const [hover, setHover] = useState(false)

    useEffect(() => setPinned(false), [clear])

    return (
        <WordStyle
            pinned={pinned}
            onClick={() => setPinned((p) => !p)}
            onMouseEnter={() => pinned ? setHover(true) : null}
            onMouseLeave={() => pinned ? setHover(false) : null}
            hover={hover}
        >{word}</WordStyle>
    )
}

const WordStyle = styled.div`

    margin: 0px 5px 0px 5px;
    display: inline-block;
    color: black;
    /* color: ${(props) => props.pinned ? "black" : "white"}; */
    &:hover{
        color: ${(props) => props.hover ? "#888" : "black"};
    }
    
`