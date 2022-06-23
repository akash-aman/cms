import React from 'react'

// scss is written in main 

const CodeBlock = (props) => {

    const className = props.children.props.className
    const language = className.replace(/language-/, "")
    return (
        <>
            <div className="code-tab">{language}</div>
            <div className="code-bg-highliter">
                {props.children}
            </div>
        </>
    );
}

export default CodeBlock;