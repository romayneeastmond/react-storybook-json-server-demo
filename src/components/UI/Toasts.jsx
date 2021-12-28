import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { pop } from '../../store/notificationToastsSlice'

import Toast from './Toast'
import ToastWrapper from './ToastWrapper'

const Toasts = () => {
    const toasts = useSelector(state => state.toasts.value)

    const dispatch = useDispatch()

    return (
        <>
            {ReactDOM.createPortal(
                (toasts && toasts.length > 0) &&
                <ToastWrapper>
                    {(
                        toasts.map((toast) => (
                            <Toast key={toast.id} {...toast} colour={toast.colour} title={toast.title} text={<>{toast.text}</>} onClick={() => { dispatch(pop({ id: toast.id })) }} />
                        ))
                    )}
                </ToastWrapper>
                , document.getElementById('toasts-root'))
            }
        </>
    )
}

export default Toasts