'use client';

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthSocialButtons } from "./AuthSocialButtons";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
type Variant = "LOGIN" | "REGISTER";

export const AuthForm = () => {

  const [variant, setvariant] = useState<Variant>('LOGIN')
  const [IsLoading, setIsLoading] = useState(false)

  const toogleVariant = useCallback(
    () => {
      if (variant === "LOGIN") {
        setvariant('REGISTER')
      } else {
        setvariant('LOGIN')
      }
    },
    [variant],
  )

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === "REGISTER") {
      // Axios Register
      axios.post('/api/register',data)
    }
    if (variant === "LOGIN") {
      // Axios Login
    }
  }

  const socialActions = (action: string) => {
    setIsLoading(true)
  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input label="Name" placeholder="Enter your Name" id="name" register={register} errors={errors} disabled={IsLoading} />
          )}
          <Input label="Email Address" placeholder="Enter your Email Address" id="email" register={register} errors={errors} disabled={IsLoading}/>
          <Input label="Password" placeholder="**********" id="password" type="password" register={register} errors={errors} disabled={IsLoading}/>
          <div>
            <Button disabled={IsLoading} fullWidth type="submit">{variant === 'LOGIN' ? "Sign in" : "Register"}</Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or Continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButtons icon={BsGithub} onClick={() => socialActions('github')} />
            <AuthSocialButtons icon={BsGoogle}  onClick={() => socialActions('google')}/>
          </div>
        </div>

        <div className=" flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>{variant === 'LOGIN' ? 'New to Messenger?' : "Already Have an account?"}</div>
            <div onClick={toogleVariant} className="underline cursor-pointer">
{variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
        </div>
      </div>
    </div>
  )
}
