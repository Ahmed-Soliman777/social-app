import * as Zod from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Component/context/tokenContext';
import toast from "react-hot-toast";
import { UserContext } from "../../Component/context/UserContext";

const schema = Zod.object({
  email: Zod.string().nonempty("Email is required"),
  password: Zod.string().nonempty("Password is required")
})
export default function Login() {

  let { getUserData } = useContext(UserContext)

  let { setToken } = useContext(tokenContext)

  let navigate = useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  async function getData(x) {
    console.log(x);

    let res = await axios.post('https://linked-posts.routemisr.com/users/signin', x).catch((err) => {
      // console.error("Invalid User!");
      toast.error(err.response.data.error)
    })
    console.log(res);
    if (res?.data?.message == "success") {
      toast.success("Login Success")
      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      getUserData()
      navigate('/')
       // console.log(token);
    }
  }

  return (
    <div>
      <h1 className="">Login</h1>


      <form onSubmit={handleSubmit(getData)} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors.email &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> {errors.email.message}
            </div>}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors.password &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> {errors.password.message}
            </div>}
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </form>

    </div>
  )
}
