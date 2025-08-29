import * as Zod from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { _maxLength } from './../../../node_modules/zod/v4/core/api';
import regImg from "../../../public/images/registerImg.png"
import toast from "react-hot-toast";


const schema = Zod.object({
  name: Zod.string().nonempty("Name is required").max(15, "Name must be maximum 15 characters").min(2, "Name must be at least 2 characters"),
  email: Zod.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: Zod.string().nonempty("Password is required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"),
  rePassword: Zod.string().nonempty("rePassword is required"),
  gender: Zod.string().nonempty("gender is required").regex(/^(male|female)$/, "Invalid gender"),
  dateOfBirth: Zod.coerce.date().refine((val) => {
    let nowDate = new Date().getFullYear()
    let DateOfBirth = val.getFullYear()
    return (nowDate - DateOfBirth) >= 19
  }, "Invalid Age")
}).refine((data) => {
  return data.password === data.rePassword
}, {
  message: "Passwords do not match",
  path: ["rePassword"]
})

export default function Register() {

  let navigate = useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  // console.log(errors);


  async function getData(x) {
    // console.log(x);

    let res = await axios.post('https://linked-posts.routemisr.com/users/signup', x).catch((err) => {
      // console.error("Invalid User!");
      toast.error(err.response.data.error)
    })
    // console.log(res);
    if (res?.data?.message == "success") {
      toast.success("User Created Successfully")
      navigate('/login')
    }
  }

  return (
    <div className="flex justify-between items-center">

      <div className="w-1/2 lg:block md:hidden">

        <img src={regImg} alt="social media reg img" className="w-full" />
      </div>

      <form onSubmit={handleSubmit(getData)} className="lg:w-1/2 w-full p-5">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input {...register("name", {
            required: {
              value: true,
              message: "Name is required"
            }, minLength: {
              value: 3,
              message: "Name must be at least 3 characters long"
            }
          })} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors.name &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> {errors.name.message}
            </div>}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input {...register("email", {
            required: {
              value: true,
              message: "Email is required"
            },
            pattern: {
              value: /^$/,
              message: "Invalid email"
            }
          })} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
          <input {...register("rePassword")} type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors.rePassword &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> {errors.rePassword.message}
            </div>}
        </div>

        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select {...register("gender")} id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected disabled>Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender &&
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Danger alert!</span> {errors.gender.message}
          </div>}

        <div className="my-5">
          <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter date of birth</label>
          <input {...register("dateOfBirth")} type="date" id="dateOfBirth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors.dateOfBirth &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> {errors.gender.message}
            </div>}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
      </form>

    </div>
  )
}
