import { FC, JSX, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation, useRegisterMutation } from '../../features/auth/auth-api-slice.ts';
import toast from 'react-hot-toast';

type FormData = {
    email: string;
    username: string;
    password: string;
}

export const Register: FC = (): JSX.Element => {
    const emailRef = useRef<HTMLInputElement>();

    const [signUp, { isLoading }] = useRegisterMutation();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async data => {
        try {
            const userData = await signUp(data).unwrap();
            console.log(userData);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <label>Email</label>
            <input ref={emailRef} {...register('email')} type="text"/>
            <label>Username</label>
            <input {...register('username')} type="text"/>
            <label>Password</label>
            <input {...register('password')} type="password"/>
            <input type="submit" value="Register"/>
        </form>
    )
}