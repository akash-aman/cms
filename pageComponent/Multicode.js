import React, { useState } from 'react';
// scss reused from codeblock component /// see main.scss
const MultiCode = ({ children }) => {
    const [blockNo, setBlockNo] = useState(0);
    return (
        <>
            <div> {children.map((child, i) => {
                const className = child.props.children.props.className;
                const language = className.replace(/language-/, "");
                if (blockNo === i) {
                    return <button className="code-tab" style={{}} onClick={(e) => { return setBlockNo(i) }} key={i} >{language}</button>;

                } else {
                    return <button style={{ backgroundColor: 'var(--off-color)' }} className="code-tab" onClick={(e) => { return setBlockNo(i) }} key={i} >{language}</button>;

                }
            })}</div>

            <div className="code-bg-highliter">
                {children.map((child, i) => {
                    const className = child.props.children.props.className;

                    //console.log(child.props.children.props.children);
                    return blockNo === i ? <pre key={i} className={`${className}`} ><code className={`${className}`} >{child.props.children.props.children}</code></pre> : null;
                })}

            </div>
        </>
    )
}

export default MultiCode;