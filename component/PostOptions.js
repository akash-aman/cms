import React, { useContext } from 'react'
import { ErrorContext } from "@/context/errorContext"
import { useRouter } from "next/router";
import axios from 'axios'

const PostOptions = ({ slug }) => {
    const { setError, setShow } = useContext(ErrorContext);
    const router = useRouter();

    const DeletePost = async () => {
        try {
            const res = await axios({
                method: 'post',
                url: 'https://crispysystem.azurewebsites.net/mutation',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("_token")
                },
                data: JSON.stringify({
                    query: `mutation delete($slug:String!){
        deletePost(slug:$slug){
            error
            msg
        }
    }`,
                    variables: {
                        slug: slug
                    }
                })
            });
            setError(JSON.stringify(res.data.data));
            setShow(true);

        } catch (err) {
            setError(err.message);
            setShow(true);
        }

    }

    const UpdatePost = async () => {
        router.push(`/dashboard/?slug=${encodeURIComponent(slug)}`)
    }

    return (<div>
        <button className="btn-red" style={{ margin: "1rem" }} onClick={DeletePost}>Delete Post</button>
        <button className="btn-blue" style={{ margin: "1rem" }} onClick={UpdatePost}>Update Post</button>
    </div>)
}

export default PostOptions;