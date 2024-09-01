import { FC, JSX, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorMessage, setErrorMessage } from '../../features/websocket/ws-slice.ts';

export const ErrorHandler: FC = (): JSX.Element => {
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(setErrorMessage({ errorMessage: null }));
        }
    }, [errorMessage, dispatch]);

    return <Toaster/>;
}