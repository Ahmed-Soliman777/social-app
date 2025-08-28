import React, { useContext } from 'react'
import { UserContext } from './../context/UserContext';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

export default function CreatePost({ refetch }) {

    let { user } = useContext(UserContext)

    let { handleSubmit, register } = useForm()

    let fileInput = useRef()


    let { mutate } = useMutation({
        mutationFn: handleCreatePost,
        onSuccess: () => {
            toast.success("post created")
            // setTimeout(() => {
            //     window.location.reload()
            // }, 500)
            refetch()
        },
        onError: (err) => {
            toast.error(err.response.data.error)
        }
    })


    async function handleCreatePost(obj) {

        let formData = new FormData()

        formData.append("body", obj.body)

        formData.append("image", fileInput.current.files[0])

        let { data } = await axios.post(`https://linked-posts.routemisr.com/posts`, formData, {

            headers: {
                token: localStorage.getItem("token")
            }

        })

    }


    return (
        <form onSubmit={handleSubmit(mutate)} className='bg-white p-5 rounded-2xl'>
            <h2>post something</h2>
            <div className="my-5 flex justify-between items-center">
                <img src={user?.photo} alt={user?.name} className="w-10 h-10 rounded-full" />
                <div class="w-3/4">
                    <input {...register("body")} type="text" id="body" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Body' />
                </div>
                <label htmlFor="uploadFile">
                    <span className='cursor-pointer'>Media</span>
                    <input ref={fileInput} type="file" name='' hidden id='uploadFile' />
                </label>
            </div>
            <button type="submit" class="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Post</button>
        </form>
    )
}
