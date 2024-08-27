import { FC, JSX, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../features/auth/auth-api-slice.ts';
import toast from 'react-hot-toast';

type FormData = {
    email: string;
    password: string;
}

export const Login: FC = (): JSX.Element => {
    const emailRef = useRef<HTMLInputElement>();

    const [login, { isLoading }] = useLoginMutation();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async data => {
        try {
            const userData = await login(data).unwrap();
            console.log(userData);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <h1>Login</h1>
            <label>Email</label>
            <input ref={ emailRef } { ...register('email') } type="text" />
            <label>Password</label>
            <input { ...register('password') } type="password" />
            <input type="submit" value="Login" />
        </form>
    )
}