'use client'


import React from 'react';
import { useRouter } from 'next/navigation';
import {Input} from "@nextui-org/react";
import { MailIcon } from './components/icons/MailIcon';
import { EyeFilledIcon } from './components/icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from './components/icons/EyeSlashFilledIcon';
import { useForm,  Controller, set,  } from 'react-hook-form';
import { LoginType } from './types/types'
import { signIn } from 'next-auth/react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './utils/firebase/firebase_initialization';
import {toast} from 'react-toastify'
import { redirect} from 'next/navigation'
import { Button } from '@nextui-org/react';



export default function Home() {
  const { register, handleSubmit, getValues} = useForm<LoginType>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();


  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  
 
  const onSubmit = async (data : LoginType)  => {
    setIsSubmitting(true);
    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsSubmitting(false);
      router.push('/dashboard');
    } catch (error : any) {
    
      if (error.code  === 'auth/invalid-login-credentials') { 
        setIsSubmitting(false);
        toast.error('Invalid Login Credentials',{
        draggable:true,
          position:'top-right'
        })
    }
    }
  };

  
  
  return (
    <main className='h-screen flex justify-center items-center'>
      <div className="flex w-full justify-center max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        {/* <div className="hidden bg-cover lg:block lg:w-1/2"  ></div> */}

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            {/* <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/> */}
            <h2 className='mt-3 text-xl text-center text-gray-600 dark:text-gray-200'>
              Trade Alliance
            </h2>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"> login
              with email</a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10">
            {/* <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label> */}
            <Input
              key="outside"
              type="email"
              label="Enter Email"
              labelPlacement="outside"
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
               {...register("email", { required: true })}
            />
            {/* <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" /> */}
          </div>

          <div className="mt-10">
            <div className="flex justify-between">
              {/* <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Password</label> */}
              {/* <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a> */}
            </div>
            <Input
      key="outside"
      label="Password"
      labelPlacement="outside"     
     {...register("password", { required: true })}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="w-full"
    />
            {/* <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" /> */}
          </div>

          <div className="mt-6">
             
            <Button 
            className='w-full'
             type='submit'
            color="primary" isLoading={isSubmitting} >
              Sign In
            </Button>
          </div>
          </form>
          <div className="flex items-center justify-center mt-4">
            <small className='text-sm opacity-40' >
              Crafted By Resonantt 
            </small>
          </div>
        </div>
      </div>
    </main>
  )
}
