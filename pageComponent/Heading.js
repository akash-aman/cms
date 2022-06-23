
import React from 'react'







const getId = (children) => {


    const temp = [];
    if (typeof children !== "string") {

        if (!children.length) {
            temp.push(children.props.children)
        } else {
            children.forEach(element => {
                if (typeof element == "string") {
                    temp.push(element);
                } else {
                    temp.push(element.props.children);
                }
            });
        }

    }

    const Id = temp.length ? temp.join().replace(/[.*,#+?^'${}()|[\]\\]/g, "") : children.replace(/[.*#,+?^'${}()|[\]\\]/g, "");
    const Id_final = Id.replace(/ /g, "-");
    // setToc([...Id_final]);
    //  console.log(Id_final)
    return Id_final;
}

const H1 = ({ children, title }) => {


    const Id_final = getId(children);

    if (title) {
        return (
            <h1 id={Id_final} className="border-bottom">{children}</h1>
        );

    } else {
        return (
            <h1 id={Id_final} >{children}</h1>
        );
    }

}

const H2 = ({ children, title }) => {

    const Id_final = getId(children);

    if (title) {
        return (
            <h2 id={Id_final} className="border-bottom">{children}</h2>
        );

    } else {
        return (
            <h2 id={Id_final} >{children}</h2>
        );
    }

}


const H3 = ({ children, title }) => {


    const Id_final = getId(children);

    // const Id = children.replace(/[.*+?^'${}()|[\]\\]/g, "");
    // //const Id = children.replace(" ","-");
    // const Id_final = Id.replace(/ /g, "-");
    if (title) {
        return (
            <h3 id={Id_final} className="border-bottom">{children}</h3>
        );

    } else {
        return (
            <h3 id={Id_final} >{children}</h3>
        );
    }

}


const H4 = ({ children, title }) => {

    const Id_final = getId(children);

    if (title) {
        return (
            <h4 id={Id_final} className="border-bottom">{children}</h4>
        );

    } else {
        return (
            <h4 id={Id_final} >{children}</h4>
        );
    }

}


const H5 = ({ children, title }) => {

    const Id_final = getId(children);

    if (title) {
        return (
            <h5 id={Id_final} className="border-bottom">{children}</h5>
        );

    } else {
        return (
            <h5 id={Id_final} >{children}</h5>
        );
    }

}

const H6 = ({ children, title }) => {

    const Id_final = getId(children);

    if (title) {
        return (
            <h6 id={Id_final} className="border-bottom">{children}</h6>
        );

    } else {
        return (
            <h6 id={Id_final} >{children}</h6>
        );
    }

}

export { H1, H2, H3, H4, H5, H6 }