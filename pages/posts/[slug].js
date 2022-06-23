import React from 'react'
import axios from 'axios'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Layout from "../../component/Layout"
import SEO from '../../component/SEO'
import styleSlug from '@/styles/slug.module.scss'
import mdxPrism from 'mdx-prism'
import CodeBlock from '@/pageComponent/CodeBlock'
import MultiCode from "@/pageComponent/Multicode"
import { H1, H2, H3, H4, H5, H6 } from '@/pageComponent/Heading'
import remarkMath from 'remark-math';
import katex from 'rehype-katex'
import NextImage from '@/component/Image';
const components = {
  // 
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  //   inlineCode: Code,
  // blockquote: Blockquote,
  // pre: PrismSetup,
  pre: CodeBlock,
  // table: Table,
  MultiCode: MultiCode,
  //Image: NextImage

}
const Post = ({ data, rawdata, title, description }) => {

  // generating table of content
  const toc = rawdata.replace(/```(.|\n)*?```/g, '')
    .split('\n')
    .map((line) => {
      if (line.match(/^##*\s/)) {
        return { level: line.match(/^##*\s/)[0].length, ...line.match(/^##*\s/) };
      }
    }).filter((item) => (item));


  const scroll = (e, heading) => {

    var elem = document.getElementById(`${heading}`);
    elem.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>

      <SEO title={title} description={description} />
      <Layout>

        <div className={styleSlug.wrapper}>
          <div className={styleSlug.content}>
            <MDXRemote {...data} components={components} />
          </div>
          <aside className={styleSlug.toc}>
            <ul className={styleSlug.ul}>
              {toc.map((content, i) => {
                const heading = content.input.replace(/[.**,`#+?^'${}()|[\]\\]/g, "").slice(1).replace(/ /g, "-");
                return <li key={i} onClick={(e) => (scroll(e, heading))} className={`toc-heading-${content.level}`} >{content.input.replace(/[#*]/g, "")}</li>
              })}
            </ul>
          </aside>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  // MDX text - can be from a local file, database, anywhere
  //   const res = await axios({
  //     method:'get',
  //     url:'https://sirakashaman.github.io/Photos/post.mdx'
  //   });

  const { params } = context;
  const res = await axios({
    method: 'post',
    url: 'https://crispysystem.azurewebsites.net/query',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      query: `{
        post(slug:"${params.slug}"){
            body
            title
            description
        }
    }`,
      variables: {}
    })
  })

  //console.log(res.data.data);
  // console.log(res.data.post.body)
  //const source = "Backroads Tours\n\n<blockquote display=\"info\">\n  In spite of warnings, change rarely occurs until the status quo becomes more\n  painful than change. People seem not to see that their opinion of the world is\n  also a confession of their character.\n</blockquote>\n\n## Some Random Text\n\n_I'm baby humblebrag neutra taiyaki af vice bespoke locavore fanny pack_ ramps vexillologist succulents. Normcore etsy pour-over adaptogen skateboard fashion axe, bushwick food truck beard lumbersexual master cleanse actually deep v. *Retro cardigan raw denim franzen kickstarter you probably haven't heard of them literally* aesthetic snackwave four dollar toast. Keffiyeh synth umami, helvetica yr flexitarian jean shorts banh mi cardigan leggings letterpress paleo intelligentsia narwhal.\n\n## First Trial heading 🚀\n\n<blockquote display=\"warning\">\n  info \"The greatest glory in living lies not in never falling, but in rising\n  every time we fall.\" -Nelson Mandela\n</blockquote>\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum aliquet ipsum, vitae fermentum augue pulvinar suscipit. Ut vehicula dapibus metus, sit amet pellentesque sapien interdum ac. Etiam at leo ut ex ultricies rutrum quis at ante. Phasellus id neque nisi. Mauris et hendrerit diam. Praesent ornare a nulla at mattis. Nam diam tellus, auctor sit amet volutpat id, ultrices in quam. Integer at fringilla tortor, eu vestibulum quam.\n\nInteger vel iaculis mi. Phasellus id ornare ex. Curabitur sed mauris sollicitudin, ultrices nibh id, egestas ante. Mauris ultrices, velit sed euismod posuere, mauris eros accumsan tortor, eu egestas ligula nulla ut urna. Donec vel ultricies enim. Sed non gravida ipsum. In a tortor at ipsum sodales ultricies vitae eget risus.\n\n> *\"Yours* time is limited, so don't waste it living someone else's life. Don't be\n> trapped by dogma – which is living with the results of other people's\n> thinking.\" -Steve Jobs\n\n## what's if we want code no issue 😁\n\njsx\nconst { currentPage, numPages } = pageContext;\nconst {\n  allMdx: { nodes: posts },\n} = data;\n\nconst transitions = useTransition(true, null, {\n  from: { left: 20, opacity: 0, position: \"relative\", scrollBehavior: \"none\" },\n  enter: { left: 0, opacity: 1 },\n  leave: { opacity: 0 },\n});\n\n\n### At last but not the least 🙄\n\n$$\n x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\n$$\n\n# and all mdx extra things\n\nInteger vel iaculis mi. Phasellus id ornare ex. Curabitur sed mauris sollicitudin, ultrices nibh id, egestas ante. Mauris ultrices, velit sed euismod posuere, mauris eros accumsan tortor, eu egestas ligula nulla ut urna. Donec vel ultricies enim. Sed non gravida ipsum. In a tortor at ipsum sodales ultricies vitae eget risus.\n\n# Algorithms For Sorting\n\n| Tables   |      Are      |  Cool |  Cool |  Cool |  Cool |  Cool |\n| -------- | :-----------: | ----: | ----: | ----: | ----: | ----: |\n| col 1 is | left-aligned  | $1600 | $1600 | $1600 | $1600 | $1600 |\n| col 2 is |   centered    |   $12 |   $12 |   $12 |   $12 |   $12 |\n| col 3 is | right-aligned |    $1 |    $1 |    $1 |    $1 |    $1 |\n\n<MultiCode>\n\ncpp\nusing System;\n\n#include <bits/stdc++.h>\nusing namespace std;\n\nint binarySearch(int arr[], int l, int r, int x)\n{\n\tif (r >= l) {\n\t\tint mid = l + (r - l) / 2;\n\n\t\tif (arr[mid] == x)\n\t\t\treturn mid;\n\n\t\tif (arr[mid] > x)\n\t\t\treturn binarySearch(arr, l, mid - 1, x);\n\n\t\t// Else the element can only be present\n\t\t// in right subarray\n\t\treturn binarySearch(arr, mid + 1, r, x);\n\t}\n\n\t// We reach here when element is not\n\t// present in array\n\treturn -1;\n}\n\nint main(void)\n{\n\tint arr[] = { 2, 3, 4, 10, 40 };\n\tint x = 10;\n\tint n = sizeof(arr) / sizeof(arr[0]);\n\tint result = binarySearch(arr, 0, n - 1, x);\n\t(result == -1) ? cout << \"Element is not present in array\"\n\t\t\t\t: cout << \"Element is present at index \" << result;\n\treturn 0;\n}\n\n\n\npython\n\n# Python3 Program for recursive binary search.\n\n# Returns index of x in arr if present, else -1\ndef binarySearch (arr, l, r, x):\n\n\t# Check base case\n\tif r >= l:\n\n\t\tmid = l + (r - l) // 2\n\n\t\t# If element is present at the middle itself\n\t\tif arr[mid] == x:\n\t\t\treturn mid\n\n\t\t# If element is smaller than mid, then it\n\t\t# can only be present in left subarray\n\t\telif arr[mid] > x:\n\t\t\treturn binarySearch(arr, l, mid-1, x)\n\n\t\t# Else the element can only be present\n\t\t# in right subarray\n\t\telse:\n\t\t\treturn binarySearch(arr, mid + 1, r, x)\n\n\telse:\n\t\t# Element is not present in the array\n\t\treturn -1\n\n# Driver Code\narr = [ 2, 3, 4, 10, 40 ]\nx = 10\n\n# Function call\nresult = binarySearch(arr, 0, len(arr)-1, x)\n\nif result != -1:\n\tprint (\"Element is present at index % d\" % result)\nelse:\n\tprint (\"Element is not present in array\")\n\n\n\njava\n// Java implementation of recursive Binary Search\nclass BinarySearch {\n\t// Returns index of x if it is present in arr[l..\n\t// r], else return -1\n\tint binarySearch(int arr[], int l, int r, int x)\n\t{\n\t\tif (r >= l) {\n\t\t\tint mid = l + (r - l) / 2;\n\n\t\t\t// If the element is present at the\n\t\t\t// middle itself\n\t\t\tif (arr[mid] == x)\n\t\t\t\treturn mid;\n\n\t\t\t// If element is smaller than mid, then\n\t\t\t// it can only be present in left subarray\n\t\t\tif (arr[mid] > x)\n\t\t\t\treturn binarySearch(arr, l, mid - 1, x);\n\n\t\t\t// Else the element can only be present\n\t\t\t// in right subarray\n\t\t\treturn binarySearch(arr, mid + 1, r, x);\n\t\t}\n\n\t\t// We reach here when element is not present\n\t\t// in array\n\t\treturn -1;\n\t}\n\n\t// Driver method to test above\n\tpublic static void main(String args[])\n\t{\n\t\tBinarySearch ob = new BinarySearch();\n\t\tint arr[] = { 2, 3, 4, 10, 40 };\n\t\tint n = arr.length;\n\t\tint x = 10;\n\t\tint result = ob.binarySearch(arr, 0, n - 1, x);\n\t\tif (result == -1)\n\t\t\tSystem.out.println(\"Element not present\");\n\t\telse\n\t\t\tSystem.out.println(\"Element found at index \" + result);\n\t}\n}\n\n\n\n\n</MultiCode>"
  // console.log(source)

  // var string_copy = (' ' + res.data.data.post.body).slice(1);

  const mdxSource = await serialize(res.data.data.post.body, { mdxOptions: { rehypePlugins: [mdxPrism, katex], remarkPlugins: [remarkMath] } })
  //console.log(mdxSource);
  return {
    props: {
      data: mdxSource,
      rawdata: res.data.data.post.body,
      title: res.data.data.post.title,
      description: res.data.data.post.description,
    },
    notFound: !res,
    revalidate: 60
  }
}

export async function getStaticPaths() {
  // const products = await getTop1000Products()
  const res = await axios({
    method: 'post',
    url: 'https://crispysystem.azurewebsites.net/query',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      query: `{
        posts{
          slug
        }
      }`,
      variables: {}
    })
  })

  //-----------------------------------------
  //-- Getting all the pages at build time
  //-----------------------------------------
  const paths = res.data.data.posts.map((item, i) => ({ params: { slug: `${item.slug}` } }));

  return { paths, fallback: 'blocking' }
}

export default Post;


