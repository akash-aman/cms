import React from 'react'
import Layout from '@/component/Layout';
import Image from 'next/image';
import Link from 'next/link'
import axios from 'axios'
import { useTransition, animated } from 'react-spring';
import PostOptions from '@/component/PostOptions';
import { useAuth } from '@/context/authContext'

const Tags = ({ data }) => {
    const authContext = useAuth();

    const transitions = useTransition(true,
        {
            from: { left: 20, opacity: 0, position: 'relative', scrollBehavior: 'none', zIndex: 0 },
            enter: { left: 0, opacity: 1, zIndex: 0 },
        })



    return transitions(
        (styles, item) => item &&

            <Layout>
                <animated.div className="grid-view" style={styles}>

                    {data.map((item, index) => (<div key={index} className="div">
                        <div className="innerdiv" style={{ aspectRatio: " auto 3 / 2", overflow: "hidden" }}><Image style={{ overflow: "hidden" }} src={`https://akash-aman.github.io/cdn.crispysystem/${item.slug}.webp`} width="500" height="362" priority />
                        </div>
                        {authContext.user ? <PostOptions slug={item.slug} /> : null}
                        <Link href={`/posts/${item.slug}`} style={{ fontWeight: "800" }}><h3 style={{ margin: "1.2rem 0 0 1rem" }}>{item.title}</h3></Link>
                        <div style={{ fontWeight: "300" }}><p style={{ margin: "0.5rem 0 0 1rem" }}>{item.author} </p></div>
                    </div>))}
                </animated.div>
            </Layout>

    )
}

export default Tags;



export async function getStaticProps(context) {

    const { params } = context;

    const res = await axios({
        method: 'post',
        url: 'https://crispysystem.azurewebsites.net/query',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            query: `{
        posts(tags:["${params.tag}"]){
          slug
          title
          author
          category
        }
    }`,
            variables: {}
        })
    })

    return { props: { data: res.data.data.posts, error: false, msg: "", revalidate: 60 } }
}


export async function getStaticPaths() {


    const res = await axios({
        method: 'post',
        url: 'https://crispysystem.azurewebsites.net/query',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            query: `{
            AlltagCat{
                listTag
            }
        }`,
            variables: {}
        })
    })

    //-----------------------------------------
    //-- Getting all the pages at build time
    //-----------------------------------------
    const paths = res.data.data.AlltagCat.listTag.map((item, i) => ({ params: { tag: item } }));

    return { paths, fallback: 'blocking' }
}