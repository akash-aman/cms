import React from 'react'
import Layout from '@/component/Layout';
import Image from 'next/image';
import Link from 'next/link'
import axios from 'axios'
import Pagination from '@/component/Pagination'
import { PageProvider, PageContext } from "@/context/pageContext"
import { useTransition, animated } from 'react-spring';
import PostOptions from '@/component/PostOptions';
import { useAuth } from '@/context/authContext'

const Catalog = ({ data, totalPage }) => {

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
        <PageProvider totalPage={totalPage} >
          <PageContext.Consumer>
            {value => <Pagination totalPage={value.pageCount} page={1} />}
          </PageContext.Consumer>
        </PageProvider>
      </Layout>

  )
}



export default Catalog

export async function getStaticProps() {


  const totalcount = await axios({
    method: 'post',
    url: 'https://crispysystem.azurewebsites.net/query',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      query: `{
            totalcount
            }
        `,
      variables: {}
    })
  })

  const res = await axios({
    method: 'post',
    url: 'https://crispysystem.azurewebsites.net/query',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      query: `{
        posts(limit:6,skip:0){
          slug
          title
          author
          category
        }
    }`,
      variables: {}
    })
  })

  return { props: { data: res.data.data.posts, error: false, msg: "", totalPage: Math.ceil(totalcount.data.data.totalcount / 6) }, revalidate: 60 }
}



