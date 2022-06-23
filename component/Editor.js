import React, { useEffect, useState, useRef, useContext } from 'react'
import styleEdit from '../styles/editor.module.scss'
import { useRouter } from 'next/router'
//import { serialize } from 'next-mdx-remote/serialize'
// import { MDXRemote } from 'next-mdx-remote'
import axios from 'axios'
import TagInput from './TagInput'

import { ErrorContext } from '@/context/errorContext'



const Editor = () => {

    const router = useRouter();

    //-------------------------------------
    //-- Context for Global Error variable
    //-------------------------------------

    const { setError, setShow } = useContext(ErrorContext);
    //------------------------------------
    //-- Refrence of the Content Area
    //------------------------------------
    const ref = useRef();

    const [flag, setFlag] = useState(true);

    //----------------------------------------------
    //-- Managing state for array of tags & category
    //----------------------------------------------
    const [tag, createTag] = useState([]);
    const [category, createCategory] = useState([]);

    useEffect(async () => {
        if (router.query.slug) {
            const res = await axios({
                method: 'post',
                url: 'https://crispysystem.azurewebsites.net/query',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    query: `{
        post(slug:"${router.query.slug}"){
            body
            title
            description
            readTime
            category
            tags
        }
    }`,
                    variables: {}
                })
            })

            // console.log(res.data.data.post);

            const data = { ...res.data.data.post };
            data.slug = router.query.slug;
            setFormData(data);
            ref.current.value = res.data.data.post.body;
            setFlag(false);

            const newcat = res.data.data.post.category.map((item, i) => ({ key: i, label: item }));

            createCategory(newcat);

            const newtag = res.data.data.post.tags.map((item, i) => ({ key: i, label: item }));

            createTag(newtag);
        }
    }, [router.query.slug])


    //---------------------------------------------
    //-- (Html tags) tool handler for Content Area
    //----------------------------------------------
    const ToolfunctionFirst = (tagStart, tagEnd) => {
        const start = ref.current.selectionStart;
        const end = ref.current.selectionEnd;

        if (start !== end) {
            const updatedString = `${ref.current.value.substring(0, start)}${tagStart}${ref.current.value.substring(start, end)}${tagEnd}${ref.current.value.substring(end)}`
            ref.current.value = updatedString;
        }
    }

    //----------------------------------------------
    //-- Starting tag tool handler for Content area
    //----------------------------------------------
    const ToolfunctionSecond = (tagStart) => {
        ref.current.focus();
        const start = ref.current.selectionStart;

        const loc = ref.current.value.lastIndexOf('\n', (ref.current.value[start] === '\n') ? start - 1 : start);
        const updatedString = `${ref.current.value.substring(0, loc + 1)}${tagStart}${ref.current.value.substring(loc + 1)}`
        ref.current.value = updatedString;
        ref.current.selectionStart = start;
        ref.current.selectionEnd = start;
    }

    //----------------------------------------------
    //-- Constant data of All tool in form of array
    //----------------------------------------------
    const tools = [

        {
            name: "bold",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="bold" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className={styleEdit.size1}><g><path fill="currentColor" d="M32 32h32v80H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16zm32 368v80H32a16 16 0 0 1-16-16v-48a16 16 0 0 1 16-16z" className={styleEdit.secondary}></path><path fill="currentColor" d="M332.53 237.78c12.86-15.8 24.9-44.81 26.93-65C366.85 96.48 306.81 32 232 32H64v448h183.62C322.94 480 384 419.11 384 344a135.36 135.36 0 0 0-51.47-106.22zM144 112h88a48 48 0 1 1 0 96h-88zm88 288h-88V288h88a56 56 0 1 1 0 112z" className={styleEdit.primary}></path></g></svg>,
            method: () => ToolfunctionFirst("**", "**"),
        },
        {
            name: "italic",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="italic" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={styleEdit.size1} ><g><path fill="currentColor" d="M208 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm96-384H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" className={styleEdit.secondary}></path><path fill="currentColor" d="M158.75 96h82.5l-80 320h-82.5z" className={styleEdit.primary}></path></g></svg>,
            method: () => ToolfunctionFirst("_", "_"),
        },

        {
            name: "Blockquote",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styleEdit.size1}><g><path fill="currentColor" d="M464 256h-80v-64a64.06 64.06 0 0 1 64-64h8a23.94 23.94 0 0 0 24-23.88V56a23.94 23.94 0 0 0-23.88-24H448a160 160 0 0 0-160 160v240a48 48 0 0 0 48 48h128a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48z" className={styleEdit.secondary}></path><path fill="currentColor" d="M176 256H96v-64a64.06 64.06 0 0 1 64-64h8a23.94 23.94 0 0 0 24-23.88V56a23.94 23.94 0 0 0-23.88-24H160A160 160 0 0 0 0 192v240a48 48 0 0 0 48 48h128a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48z" className={styleEdit.primary}></path></g></svg>,
            method: () => ToolfunctionSecond("> "),

        },
        {
            name: "Heading 1",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="h1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-h1 fa-w-18 fa-3x"><g><path fill="currentColor" d="M304 96h-98.94A13.06 13.06 0 0 0 192 109.06v37.88A13.06 13.06 0 0 0 205.06 160H224v64H96v-64h18.94A13.06 13.06 0 0 0 128 146.94V112a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v34.94A13.06 13.06 0 0 0 13.06 160H32v192H13.06A13.06 13.06 0 0 0 0 365.06V400a16 16 0 0 0 16 16h98.94A13.06 13.06 0 0 0 128 402.94v-37.88A13.06 13.06 0 0 0 114.94 352H96v-64h128v64h-18.94A13.06 13.06 0 0 0 192 365.06V400a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-34.94A13.06 13.06 0 0 0 306.94 352H288V160h18.94A13.06 13.06 0 0 0 320 146.94V112a16 16 0 0 0-16-16z" className={styleEdit.primary}></path><path fill="currentColor" d="M560 352h-48V120a24 24 0 0 0-24-24h-40a24 24 0 0 0-21.44 13.26l-24 48A24 24 0 0 0 424 192h24v160h-48a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" className={styleEdit.secondary}></path></g></svg>,
            method: () => ToolfunctionSecond("# "),
        },
        {
            name: "Heading 2",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="h2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-h2 fa-w-18 fa-3x"><g><path fill="currentColor" d="M304 96h-98.94A13.06 13.06 0 0 0 192 109.06v37.88A13.06 13.06 0 0 0 205.06 160H224v64H96v-64h18.94A13.06 13.06 0 0 0 128 146.94V112a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v34.94A13.06 13.06 0 0 0 13.06 160H32v192H13.06A13.06 13.06 0 0 0 0 365.06V400a16 16 0 0 0 16 16h98.94A13.06 13.06 0 0 0 128 402.94v-37.88A13.06 13.06 0 0 0 114.94 352H96v-64h128v64h-18.94A13.06 13.06 0 0 0 192 365.06V400a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-34.94A13.06 13.06 0 0 0 306.94 352H288V160h18.94A13.06 13.06 0 0 0 320 146.94V112a16 16 0 0 0-16-16z" className={styleEdit.primary}></path><path fill="currentColor" d="M560 352H440.79c17-42.95 135.21-66.57 135.21-159.62C576 132.55 528.33 96 469.14 96c-43.83 0-81.41 21.38-103.42 57a15.66 15.66 0 0 0 4.75 21.4l28.26 18.6a16.15 16.15 0 0 0 21.86-3.83c10.77-14.86 24.94-26 43.85-26s38.22 10.46 38.22 33.84c0 52.18-142.1 73.21-142.1 184.56a155.06 155.06 0 0 0 1.71 20.66A15.94 15.94 0 0 0 378.14 416H560a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" className={styleEdit.secondary}></path></g></svg>,
            method: () => ToolfunctionSecond("## "),
        },
        {
            name: "Heading 3",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="h3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-h3 fa-w-18 fa-3x"><g><path fill="currentColor" d="M304 96h-98.94A13.06 13.06 0 0 0 192 109.06v37.88A13.06 13.06 0 0 0 205.06 160H224v64H96v-64h18.94A13.06 13.06 0 0 0 128 146.94V112a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v34.94A13.06 13.06 0 0 0 13.06 160H32v192H13.06A13.06 13.06 0 0 0 0 365.06V400a16 16 0 0 0 16 16h98.94A13.06 13.06 0 0 0 128 402.94v-37.88A13.06 13.06 0 0 0 114.94 352H96v-64h128v64h-18.94A13.06 13.06 0 0 0 192 365.06V400a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-34.94A13.06 13.06 0 0 0 306.94 352H288V160h18.94A13.06 13.06 0 0 0 320 146.94V112a16 16 0 0 0-16-16z" className={styleEdit.primary}></path><path fill="currentColor" d="M499 217.69l64.4-72.31a15.48 15.48 0 0 0 4-10.31v-23.32A16 16 0 0 0 551.12 96H384a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h85.18c-2.29 2.45-4.65 5-7.19 7.9l-53.1 61.1a18 18 0 0 0-3.83 10.17 18.36 18.36 0 0 0 1.38 6.34l8.41 18.59c2.35 5.21 9 9.42 14.84 9.42h15.95c28.94 0 57.79 10.32 57.79 38.48 0 21.32-19.93 36.79-47.39 36.79-22.08 0-41.18-9.17-57.7-22.83a16.46 16.46 0 0 0-23.87 3.34l-19.75 28.8a15.46 15.46 0 0 0 2.53 20.35C384.9 403.21 422 416 459.51 416c71 0 116.49-48.86 116.49-106.06 0-47.3-32.73-80.89-77-92.25z" className={styleEdit.secondary}></path></g></svg>,
            method: () => ToolfunctionSecond("### "),
        },
        {
            name: "Heading 4",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="h4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-h4 fa-w-18 fa-3x"><g><path fill="currentColor" d="M304 96h-98.94A13.06 13.06 0 0 0 192 109.06v37.88A13.06 13.06 0 0 0 205.06 160H224v64H96v-64h18.94A13.06 13.06 0 0 0 128 146.94V112a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v34.94A13.06 13.06 0 0 0 13.06 160H32v192H13.06A13.06 13.06 0 0 0 0 365.06V400a16 16 0 0 0 16 16h98.94A13.06 13.06 0 0 0 128 402.94v-37.88A13.06 13.06 0 0 0 114.94 352H96v-64h128v64h-18.94A13.06 13.06 0 0 0 192 365.06V400a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-34.94A13.06 13.06 0 0 0 306.94 352H288V160h18.94A13.06 13.06 0 0 0 320 146.94V112a16 16 0 0 0-16-16z" className={styleEdit.primary}></path><path fill="currentColor" d="M560 224h-16V112a16 16 0 0 0-16-16h-32a16 16 0 0 0-16 16v112h-64V112a16 16 0 0 0-16-16h-32a16 16 0 0 0-16 16v144a32 32 0 0 0 32 32h96v112a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V288h16a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" className={styleEdit.secondary}></path></g></svg>,
            method: () => ToolfunctionSecond("#### "),
        },

        // {
        //     name: "list",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
        // {
        //     name: "ordered list",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
        // {
        //     name: "list item",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
        {
            name: "code",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="brackets-curly" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={styleEdit.size1}><g><path fill="currentColor" d="M566.64 233.37a32 32 0 0 1 0 45.25l-45.25 45.25a32 32 0 0 0-9.39 22.64V384a96 96 0 0 1-96 96h-48a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h48a32 32 0 0 0 32-32v-37.48a96 96 0 0 1 28.13-67.89L498.76 256l-22.62-22.62A96 96 0 0 1 448 165.47V128a32 32 0 0 0-32-32h-48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h48a96 96 0 0 1 96 96v37.48a32 32 0 0 0 9.38 22.65l45.25 45.24z" className={styleEdit.secondary}></path><path fill="currentColor" d="M208 32h-48a96 96 0 0 0-96 96v37.48a32.12 32.12 0 0 1-9.38 22.65L9.38 233.37a32 32 0 0 0 0 45.25l45.25 45.25A32.05 32.05 0 0 1 64 346.51V384a96 96 0 0 0 96 96h48a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-48a32 32 0 0 1-32-32v-37.48a96 96 0 0 0-28.13-67.89L77.26 256l22.63-22.63A96 96 0 0 0 128 165.48V128a32 32 0 0 1 32-32h48a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" className={styleEdit.primary}></path></g></svg>,
            method: () => ToolfunctionFirst("```", "```"),
        },

        {
            name: "inline code",
            svg: <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="code" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={styleEdit.size1}><g><path fill="currentColor" d="M422.12 18.16a12 12 0 0 1 8.2 14.9l-136.5 470.2a12 12 0 0 1-14.89 8.2l-61-17.7a12 12 0 0 1-8.2-14.9l136.5-470.2a12 12 0 0 1 14.89-8.2z" className={styleEdit.secondary}></path><path fill="currentColor" d="M636.23 247.26l-144.11-135.2a12.11 12.11 0 0 0-17 .5L431.62 159a12 12 0 0 0 .81 17.2L523 256l-90.59 79.7a11.92 11.92 0 0 0-.81 17.2l43.5 46.4a12 12 0 0 0 17 .6l144.11-135.1a11.94 11.94 0 0 0 .02-17.54zm-427.8-88.2l-43.5-46.4a12 12 0 0 0-17-.5l-144.11 135a11.94 11.94 0 0 0 0 17.5l144.11 135.1a11.92 11.92 0 0 0 17-.5l43.5-46.4a12 12 0 0 0-.81-17.2L117 256l90.6-79.7a11.92 11.92 0 0 0 .83-17.24z" className={styleEdit.primary}></path></g></svg>,
            method: () => ToolfunctionFirst("`", "`"),
        },
        // {
        //     name: "pre",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
        // {
        //     name: "em",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
        // {
        //     name: "strong",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
        // {
        //     name: "delete",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
        // {
        //     name: "link",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
        // {
        //     name: "image",
        //     svg: <svg></svg>,
        //     method:Toolfunction("**","**"),
        // },
    ]



    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        readTime: "",
        description: "",
        body: "",
    })


    const onFieldChange = (e) => {
        const data = { ...formData };
        data[e.target.name] = e.target.value;
        //data.body = ref.current.value;
        setFormData(data);
    }



    //----------------------------------------------
    //-- updating state for array of tags & category
    //----------------------------------------------
    const tagSubmit = (e) => {
        if (e.key === "Enter") {
            const tagData = { key: tag.length + 1, label: e.target.value };
            const tempTag = [...tag];
            tempTag.push(tagData);
            createTag(tempTag);
            e.target.value = "";
        }
    };


    //----------------------------------------------
    //-- updating state for array of tags & category
    //----------------------------------------------
    const categorySubmit = (e) => {


        if (e.key === "Enter") {
            const tagData = { key: category.length + 1, label: e.target.value };
            const tempTag = [...category];
            tempTag.push(tagData);
            createCategory(tempTag);
            e.target.value = "";
        }
    };


    //---------------------------------------------------------
    //-- Deleting single element from array of tags & category
    //---------------------------------------------------------
    const tagHandleDelete = (chipToDelete) => () => {
        createTag((tag) => tag.filter((chip) => chip.key !== chipToDelete.key));
    };

    const categoryHandleDelete = (chipToDelete) => () => {
        createCategory((category) => category.filter((chip) => chip.key !== chipToDelete.key));
    };

    //----------------------------------------------------------------
    //-- Form submit and calling api post request for submitting data
    //----------------------------------------------------------------
    const formSubmit = async (e) => {
        e.preventDefault();

        const tags = tag.map((item) => { return Object.values(item)[1] });
        const categories = category.map((item) => { return Object.values(item)[1] });


        try {
            const res = await axios({
                method: 'post',
                url: 'https://crispysystem.azurewebsites.net/mutation',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("_token")
                },
                withCredentials: true,
                data: JSON.stringify({
                    query: `mutation add($body:String!,$cat:[String]!,$tag:[String]!){
                createPost(data:{
                  slug:"${formData.slug}",
                  title:"${formData.title}",
                  description:"${formData.description}",
                  readTime:${formData.readTime},
                  body:$body,
                  category:$cat,
                  tags:$tag
                }){
                  error
                  msg
                }
              }`,
                    variables: {
                        body: ref.current.value,
                        cat: categories,
                        tag: tags
                    }
                })
            })
            setError(JSON.stringify(res.data.data));
            setShow(true);

            //const body = ref.current.value;
            //     const res = await client.mutate({
            //         mutation: gql`mutation add($body:String!,$cat:[String]!,$tag:[String]!){
            //         createPost(data:{
            //           slug:"${formData.slug}",
            //           title:"${formData.slug}",
            //           description:"${formData.description}",
            //           readTime:${formData.readTime},
            //           body:$body,
            //           category:$cat,
            //           tags:$tag
            //         }){
            //           error
            //           msg
            //         }
            //       }`,
            //         variables: {
            // body: ref.current.value,
            // cat: categories,
            // tag: tags
            //         }
            //     }
            //     )

            //     console.log(res);


        } catch (err) {
            console.log(err)
            setError(JSON.stringify(err.message));
            setShow(true);
        }

    }

    const Update = async (e) => {
        e.preventDefault();

        const tags = tag.map((item) => { return Object.values(item)[1] });
        const categories = category.map((item) => { return Object.values(item)[1] });


        try {
            const res = await axios({
                method: 'post',
                url: 'https://crispysystem.azurewebsites.net/mutation',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("_token")
                },
                withCredentials: true,
                data: JSON.stringify({
                    query: `mutation add($body:String!,$cat:[String]!,$tag:[String]!){
                updatePost(
                slug:"${formData.slug}"
                data:{
                  slug:"${formData.slug}",
                  title:"${formData.title}",
                  description:"${formData.description}",
                  readTime:${formData.readTime},
                  body:$body,
                  category:$cat,
                  tags:$tag
                }){
                  error
                  msg
                }
              }`,
                    variables: {
                        body: ref.current.value,
                        cat: categories,
                        tag: tags
                    }
                })
            })
            setError(JSON.stringify(res.data.data));
            setShow(true);

            //const body = ref.current.value;
            //     const res = await client.mutate({
            //         mutation: gql`mutation add($body:String!,$cat:[String]!,$tag:[String]!){
            //         createPost(data:{
            //           slug:"${formData.slug}",
            //           title:"${formData.slug}",
            //           description:"${formData.description}",
            //           readTime:${formData.readTime},
            //           body:$body,
            //           category:$cat,
            //           tags:$tag
            //         }){
            //           error
            //           msg
            //         }
            //       }`,
            //         variables: {
            // body: ref.current.value,
            // cat: categories,
            // tag: tags
            //         }
            //     }
            //     )

            //     console.log(res);


        } catch (err) {
            // console.log(err)
            setError(JSON.stringify(err.message));
            setShow(true);
        }

    }


    return (
        <div className={styleEdit.editor} >
            <form>
                <div className={styleEdit.body}>
                    <div><button type="button" onClick={() => (setFlag(true))} className={flag ? styleEdit.show : styleEdit.hide}>Create</button><button type="button" onClick={() => (setFlag(false))} className={flag ? styleEdit.hide : styleEdit.show}>Update</button></div>
                    <div className={styleEdit.content}>
                        <label>Title</label>
                        <input type="text" id="title" className={styleEdit.textField} name="title" onChange={onFieldChange} value={formData.title} />
                    </div>

                    <div className={styleEdit.content}>
                        <label>Slug</label>
                        <input type="text" id="slug" className={styleEdit.textField} name="slug" onChange={onFieldChange} value={formData.slug} />
                    </div>

                    <div className={styleEdit.content}>
                        <label>Read Time</label>
                        <input type="number" id="readTime" className={styleEdit.textField} name="readTime" onChange={onFieldChange} value={formData.readTime} />
                    </div>

                    <div className={styleEdit.tagCategory}>
                        <div className={styleEdit.content}>
                            <label>Category</label>
                            <input type="text" id="category" className={styleEdit.textField} onKeyDown={categorySubmit} name="category" />
                            <TagInput chipData={category} handleDelete={categoryHandleDelete} />

                        </div>
                        <div className={styleEdit.content}>
                            <label>Tags</label>
                            <input type="text" id="tags" className={styleEdit.textField} onKeyDown={tagSubmit} name="tags" />
                            <TagInput chipData={tag} handleDelete={tagHandleDelete} />
                        </div>
                    </div>

                    <div className={styleEdit.content}>
                        <label>Description</label>
                        <textarea id="description" className={styleEdit.description} name="description" spellCheck="false" onChange={onFieldChange} value={formData.description} ></textarea>
                    </div>



                    <div className={styleEdit.content}>
                        <label>Content</label>
                        <div className={styleEdit.toolbar}>
                            {tools.map((tool, index) => (<div type="button" key={index} onClick={() => tool.method()}>{tool.svg}</div>))}
                        </div>

                        <textarea id="body" className={styleEdit.postBody} name="body" ref={ref} spellCheck="false" onChange={onFieldChange} ></textarea>
                    </div>

                </div>
                {flag ? <button type="button" className={"btn-green"} onClick={formSubmit} >
                    Create
                </button> :
                    <button type="button" className={"btn-green"} onClick={Update} >
                        Update
                    </button>
                }

            </form>
            <div>

            </div>
        </div>
    )
}

export default Editor;


/// update => create (editor)
/// create => update ( flag )