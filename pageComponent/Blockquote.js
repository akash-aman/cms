import React from "react"
import { FiInfo } from "react-icons/fi"
import { TiWarningOutline } from "react-icons/ti"
import { GoQuote } from "react-icons/go"
import "style/Complete/blockquote.scss"

const Blockquote = ({ children, display }) => {
    if (display === "warning")
        return (

            <div className="container warning">
                <TiWarningOutline className="icon" />
                {children}
            </div>

        );
    if (display === "info")
        return (

            <div className="container info">

                <FiInfo className="icon" />
                {children}
            </div>

        );
    if (display === "default") {
        return (

            <div className="container default">{children}</div>

        );
    } else {
        return (

            <div className="quote">
                <GoQuote className="quote-icon" />
                {children}
            </div>

        );
    }
}

export default Blockquote