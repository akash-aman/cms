import React from 'react';
import axios from 'axios';
import { useTransition, animated } from 'react-spring';
import styleCat from '@/styles/category.module.scss'
import Layout from '@/component/Layout'
import Link from 'next/link'
import Image from 'next/image';

const Index = ({ countCategory, listCategory }) => {

    const transitions = useTransition(true,
        {
            from: { left: 20, opacity: 0, position: 'relative', zIndex: 0 },
            enter: { left: 0, opacity: 1, zIndex: 0 },
        })

    return transitions(
        (styles, item) => item &&
            <Layout>
                <animated.div className="grid-view" style={styles}>
                    {listCategory.map((item, index) => (<div key={index} className="div">
                        <Link href={`/category/${item}`}><div className="innerdiv" style={{ aspectRatio: " auto 3 / 2", overflow: "hidden", backgroundBlendMode: "var(--blend-mode)", backgroundColor: "var(--blend-color)", backgroundSize: "cover", position: "relative" }}>
                        <Image style={{ overflow: "hidden" }} src={`https://akash-aman.github.io/cdn.crispysystem/${item}.webp`} width="500" height="362" priority />
                            <h1 style={{ margin: "2rem", color: "var(--gray-8)", position: "absolute", bottom: "0", textTransform: "capitalize" }}>{item}</h1>
                        </div></Link>

                    </div>))}
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
                    countCategory
                    listTag
                    listCategory
                }
            }`,
                variables: {}
            })
        })

        return {
            props: {
                countCategory: res.data.data.AlltagCat.countCategory,
                listCategory: res.data.data.AlltagCat.listCategory,
            }
        }

    } catch (err) {

    }

}

export default Index;
