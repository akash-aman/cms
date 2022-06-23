import React from "react"
import PropTypes from "prop-types"
import { useRouter } from 'next/router'
import Head from 'next/head'



const SEO = ({ title, description, image, article }) => {

    const pathname = useRouter().asPath
    const defaultTitle = "Welcome";
    const titleTemplate = "hola";
    const defaultDescription = "Welcome to offical website of CrispySystem. Find blogs & more development stuffs & Developer Details";
    const siteUrl = "https://crispysystem-frontend.vercel.app";
    const defaultImage = "/siteimg.png";
    const twitterUsername = "@sirakashaman";


    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname === "/" ? "" : pathname}`,
    }

    return (
        <Head >
            <title>{seo.title}</title>
            <meta httpEquiv="Content-Language" content="en" />
            <meta name="description" content={seo.description} />
            <meta property="og:type" content="website" />
            <meta name="image" content={seo.image} />

            {/* <link rel="icon" type="image/x-icon" href="/favicon.ico"></link> */}

            {seo.url && <meta property="og:url" content={seo.url} />}

            {(article ? true : null) && <meta property="og:type" content="article" />}

            {seo.title && <meta property="og:title" content={seo.title} />}

            {seo.description && (
                <meta property="og:description" content={seo.description} />
            )}

            {seo.image && <meta property="og:image" content={seo.image} />}

            <meta name="twitter:card" content="summary_large_image" />

            {twitterUsername && (
                <meta name="twitter:creator" content={twitterUsername} />
            )}

            {seo.title && <meta name="twitter:title" content={seo.title} />}

            {seo.description && (
                <meta name="twitter:description" content={seo.description} />
            )}

            {seo.image && <meta name="twitter:image" content={seo.image} />}
        </Head>
    );
}

export default SEO

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    article: PropTypes.bool,
}

SEO.defaultProps = {
    title: null,
    description: null,
    image: null,
    article: false,
}

