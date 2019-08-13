import React, { useState } from "react"
import ReactToPrint from "react-to-print"
import { FiClipboard as Clipboard } from "react-icons/fi"
import { FiPrinter as PrintIcon } from "react-icons/fi"
import styled from "styled-components"

export default ({ props: { border, setBorder, center, setCenter, backlight, setBacklight, clear, setClear, setText, containerRef } }) => {

    const [hideMenu, setHideMenu] = useState(false)
    const [hide, setHide] = useState(false)

    const pasteHandler = () =>
        navigator.clipboard.readText().then(
            (clipText) => setText(() => {
                const newText = clipText.split(" ")
                return newText
            }))

    const clearHandler = () => setClear((c) => !c)

    const setAbout = () => {
        const initText = "Write-Brite is an open source writing tool made by Craig Hildebrand  It belongs to the cucumbers        You can find the complete source code at github.com/targetcreature/write-brite      For anything else, contact targetcreature@gmail.com             :^)"
        const initSplit = initText.split(" ")
        setText(initSplit)
    }

    return (
        <Menu border={border} onMouseEnter={() => setHide(false)} onMouseLeave={() => hideMenu ? setHide(true) : null} hide={hide} center={center}>
            <Option onClick={pasteHandler}><Clipboard size={30} /><OptionText>PASTE</OptionText></Option>
            <Option onClick={clearHandler}><Clear border={border} /><OptionText>CLEAR</OptionText></Option>
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

                <PrintOption onClick={() => setBacklight((b) => !b)}>
                    <CheckBox type="checkbox" readOnly checked={backlight} /> BACKLIGHT
                </PrintOption>

            </PrintOptions>

            <PrintOptions>

                <PrintOption onClick={() => setHideMenu((b) => !b)}>
                    <CheckBox type="checkbox" readOnly checked={!hideMenu} /> MENU
                </PrintOption>

                <PrintOption hide>
                    <CheckBox type="checkbox" readOnly checked={center} /> CENTERED
                </PrintOption>

                <PrintOption style={{ cursor: "pointer" }} onClick={setAbout}>
                    <CheckBox type="checkbox" readOnly checked={backlight} style={{ opacity: 0, cursor: "pointer" }} /> ???
                </PrintOption>

            </PrintOptions>

        </Menu>
    )
}

const Menu = styled.div`
    display: flex;
    align-items: flex-end;
    position: fixed;
    bottom: 20px;
    /* left: ${(props) => props.center ? "20px" : "initial"}; */
    /* right: ${(props) => props.center ? "initial" : "20px"}; */
    right: 20px;
    font-family: monospace;
    color: ${(props) => props.border ? "#333" : "#666"};
    svg{
    stroke: ${(props) => props.border ? "#333" : "#666"};
    stroke-width: 1px;
    }
    opacity: ${(props) => props.hide ? 0 : 1};
    transition: opacity 0.5s;
`

const Clear = styled.div`
        width: 15px;
        height: 25px;
        border: 1px solid;
        border-color: ${(props) => props.border ? "#333" : "#666"};
        border-radius: 5px;
        transform: rotate(15deg);
`

const Option = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    padding-right: 10px;
    
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
    /* color: #333;
    svg{
      fill: #333;
    } */
    div{
        cursor: default;
    }

`
const PrintOption = styled.div`
    opacity: ${(props) => props.hide ? 0 : 1};

`

const CheckBox = styled.input`
    margin-right: 0;
`