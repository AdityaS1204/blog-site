import React from 'react'
import { useState } from 'react'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice'



const Signup = () => {
    const [error, seterror] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        seterror("")
        try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const userData = await authservice.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            seterror(error.message)
        }
    }


    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full">
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60 ">Don&apos;t have any account?&nbsp;
                    <Link
                        to={'/signup'}

                        className='font-medium text-primary transition-all duration-300 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>
                    {error}</p>}
                <form onSubmit={handleSubmit(create)}

                >
                    <div className="space-y-5">

                        <Input
                            label="Name: "
                            type="text"
                            placeholder="Enter Your name"
                            {...register("name", {
                                required: true,

                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchpattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",

                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter Your password"
                            {...register("password",{
                                required:true,
                            })}
                        />
                        <Button 
                        type='submit'
                        className='w-full'
                        >Create Account</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup