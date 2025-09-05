import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImageIcon from '../../assets/img-icon.jpg'
import ProfileIcon from '../../assets/profile-icon.jpg'


export default function PostsDetails() {
    let { id } = useParams()

    // useEffect(() => {
    //     getPostDetails()
    // }, [])

    // let [post, setPost] = useState(null)

    let { data, isLoading } = useQuery({
        queryKey: ['postDetails', id],
        queryFn: getPostDetails
    })

    let post = data?.data.post
    
    async function getPostDetails() {
        return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })


        // setPost(data.post)
        // console.log(data);

    }

    return (
        <div className='sm:w-[100%] lg:w-[67%] mx-auto'>
            {post && <div className='cardItem rounded-3xl bg-white my-5 p-5'>
                <div className="cardBody">
                    <div className="cardItem-avatar">

                        <div className="flex items-center gap-4">
                            <img className="w-10 h-10 rounded-full" src={post.user.photo} alt="" />
                            <div className="font-medium dark:text-white">
                                <div>{post.user.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toUTCString()}</div>
                            </div>
                        </div>

                    </div>

                    <p className='text-zinc-600 my-5'>{post.body}</p>
                    <img className='w-full rounded' src={(post.image) ? post.image : ImageIcon} alt={post.body} />
                </div>
                <div className="cardFooter mt-5">
                    <div className="flex justify-between">
                        <h2><i class="fa-solid fa-message"></i> {post.comments.length}</h2>
                        <Link to={'/postsDetails/' + post._id} className='text-blue-600'>See Posts Details</Link>
                    </div>

                    {
                        post.comments.map((comment) => {
                            return <div key={comment._id} className="bg-gray-100 p-5 rounded-2xl my-5">
                                <div className="cardItem-avatar">

                                    <div className="flex items-center gap-4">
                                        <img className="w-10 h-10 rounded-full" src={/*comment.commentCreator.photo ||*/ ProfileIcon} alt="" />
                                        <div className="font-medium dark:text-white">
                                            <div>{comment.commentCreator.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toUTCString()}</div>
                                        </div>
                                    </div>

                                </div>
                                <h3 className='my-3'>{comment.content}</h3>
                            </div>
                        })
                    }
                </div>
            </div>}
        </div>
    )
}
