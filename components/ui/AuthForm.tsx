'use client';

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import {Input} from '@/components/ui/input'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from './button';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';


const AuthForm = ( {type}: {type: string}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Defining form
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    //2. define a submit handler
    function onSubmit(values: z.infer<typeof authFormSchema>){
        //type-safe and validated

        setIsLoading(true)
        console.log(values)
        setIsLoading(false)
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='cursor-pointer flex items-center gap-1'>
                    <Image 
                        src='/icons/logo.svg'
                        width = {34}
                        height = {34}
                        alt="Horizon logo"
                    />

                    <h1 className='text-26 font-ibm-plex-serif-font-bold text-black-1'>
                    Horizon 
                    </h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'> 
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user 
                    ? 'Link Account' 
                    : type === 'sign-in'
                        ? 'Sing-in'
                        : 'Sign-up'
                    }

                    <p className='text-16 font-normal -text-gray-600'>
                        {user
                            ? 'Link your account to get started'
                            : 'Please enter your details' 
                        }
                    </p>
                </h1>
            </div>
        </header>

        {user ? (
            <div className='flex flex-col gap-4'>
                {/* Plaid link to link bank account*/}
            </div>
        ): (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CustomInput control={form.control} name={'email'} label={'Email'} placeholder={'Enter your email'} />
                        <CustomInput control={form.control} name={'password'} label={'Password'} placeholder={'Enter your password'}/>
                        <Button type="submit" className='form-btn' disabled={isLoading}>
                            { isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin'/> &nbsp;
                                    Loading...
                                </>
                            ) : type === 'sign-in'
                            ? 'Sign In' : 'Sing Up' }     
                        </Button>
                    </form>
                </Form>

                <footer className='flex justify-center gap-1'>

                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm
