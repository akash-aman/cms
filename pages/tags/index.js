import React from 'react';
import axios from 'axios';
import { useTransition, animated } from 'react-spring';
import styleCat from '@/styles/category.module.scss'
import Layout from '@/component/Layout'
import Link from 'next/link'

const Index = ({ listTag }) => {

    const transitions = useTransition(true,
        {
            from: { left: 20, opacity: 0, position: 'relative', zIndex: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr) )", gridGap: "1rem" },
            enter: { left: 0, opacity: 1, zIndex: 0 },
        })

    const buttonColor = ["blue", "red", "orange", "green", "purple", "yellow", "pink"]

    return transitions(
        (styles, item) => item &&
            <Layout>
                <animated.div style={styles}>
                    <div>

                    {listTag.map((item, index) => (<a key={index} style={{"maxWidth":"min-content"}}>
                        <Link href={`/tags/${item}`} ><button style={{ "padding":"10px","margin":"5px"}} className={`btn-${buttonColor[Math.floor(Math.random() * 7)]}`}>{item}</button></Link>

                    </a>))}
                    </div>
                </animated.div>
            </Layout >

    )
}

export async function getStaticProps() {

    try {

        const res = await axios({
            method: 'post',
            url: 'https://crispysystem.azurewebsites.net/query',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                query: `{
                AlltagCat{
                    countTag
                    listTag
                }
            }`,
                variables: {}
            })
        })

        return {
            props: {
                countTag: res.data.data.AlltagCat.countTag,
                listTag: res.data.data.AlltagCat.listTag,
            }
        }

    } catch (err) {

    }

}

export default Index;
