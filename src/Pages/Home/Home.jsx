import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreatePost from '../../Component/CreatePost/CreatePost'
import PostOptions from './../../Component/PostOptions/PostOptions';
import { UserContext } from '../../Component/context/UserContext';
import { useQuery } from '@tanstack/react-query';
import ImageIcon from '../../assets/img-icon.jpg'
import ProfileIcon from '../../assets/profile-icon.jpg'



export default function Home() {

  let { user } = useContext(UserContext)
  let [pageNumber, setPage] = useState(1)


  let { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: getAllPosts,
    retry: 2,
    retryDelay: 3000
  })

  let postsList = data?.data.posts

  async function getAllPosts() {
    return await axios.get(`https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt&page=${pageNumber}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })

    // setLoading(false)

    if (data.message == "success") {
      setPosts(data.posts)
    }
    // console.log(data);

  }

  if (isError) {
    return <h2>{error.response.data.error}</h2>
  }

  return (
    <>
      {isLoading ?
        <div role="status" className="animate-pulse">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
          <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
          <div className="flex items-center justify-center mt-4">
            <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
            <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
        :
        <div className="sm:w-full lg:w-[55%] mx-auto">
          <CreatePost refetch={refetch} />
          {postsList.map((post) => {
            let { _id, body, image, user: { name, photo }, createdAt, comments } = post
            let userPostId = post.user._id
            let userLoginId = user._id
            return <div key={_id} className='cardItem rounded-3xl bg-white my-5 p-5'>
              <div className="cardBody">
                <div className="cardItem-avatar">

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img className="w-10 h-10 rounded-full" src={photo} alt="" />
                      <div className="font-medium dark:text-white">
                        <div>{name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(createdAt).toUTCString()}</div>
                      </div>
                    </div>
                    {(userPostId == userLoginId) &&

                      <PostOptions refetch={refetch} postBody={body} postImage={image} postId={_id} />
                    }
                  </div>
                </div>

                <p className='text-zinc-600 my-5'>{body}</p>
                <img className='w-full rounded' src={image ? image : ImageIcon} alt={body} />
              </div>
              <div className="cardFooter mt-5">
                <div className="flex justify-between">
                  <h2><i class="fa-solid fa-message"></i> {comments.length}</h2>
                  <Link to={'/postsDetails/' + _id} className='text-blue-600'>See Posts Details</Link>
                </div>

                {comments.length > 0 && <div className="bg-gray-100 p-5 rounded-2xl my-5">
                  <div className="cardItem-avatar">

                    <div className="flex items-center gap-4">
                      <img className="w-10 h-10 rounded-full" src={/*comments[comments.length - 1].commentCreator?.photo*/  ProfileIcon} alt="" />
                      <div className="font-medium dark:text-white">
                        <div>{comments[comments.length - 1].commentCreator.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(createdAt).toUTCString()}</div>
                      </div>
                    </div>

                  </div>
                  <h3 className='my-3'>{comments[comments.length - 1].content}</h3>
                </div>}
              </div>
            </div>
          })}
        </div>
      }
      {/* {pageNumber} */}
      <nav aria-label="Page navigation example">
        <ul className="inline-flex items-center fixed bottom-2.5 start-1/2 -translate-x-1/2 -space-x-px text-sm">
          <li>
            <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>
          {Array.from({ length: 10 }).map((element, index) => {
            return (
              <li>
                <a onClick={(e) => setPage(e.target.innerHTML)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index + 1}</a>
              </li>
            )
          })}
          <li>
            <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>
    </>

  )
}
