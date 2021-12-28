import useState from 'storybook-addon-state'
import { Title, Subtitle, Description } from '@storybook/addon-docs';

import Toast from '../../components/UI/Toast'
import ToastWrapper from '../../components/UI/ToastWrapper'

import '../../App.scss'

export default {
    title: 'Components/UI/Toast',
    component: ToastWrapper,
    subcomponents: {
        Toast
    },
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <hr />
                    <p className='small'>Wrapper relies on Storybook useState which is unavailable on this view.</p>
                </>
            )
        }
    }
}

export const Wrapper = args => {
    const [toasts, setToasts] = useState([])

    const onClickToast = (id) => {
        setToasts(typeof toasts === 'undefined' ? Array.from([id]) : [...toasts.filter(x => x !== id), id])
    }

    const onReset = () => {
        setToasts([])
    }

    return (
        <>
            <div className='small'>
                <p>
                    An example using the ToastWrapper component to stack toasts. All set to persist to test the onClick event.
                </p>
                <p>
                    Wrapper relies on Storybook useState which is unavailable on the 'Docs' view.
                </p>
            </div>
            <hr />
            <button className='btn btn-sm btn-outline-secondary' onClick={onReset}>
                Reset
            </button>

            <ToastWrapper {...args}>
                {
                    (!toasts || !toasts.includes(1)) &&
                    <Toast colour={'alert-secondary'} persist={true} onClick={() => onClickToast(1)} />
                }

                {
                    (!toasts || !toasts.includes(2)) &&
                    <Toast colour={'alert-primary'} persist={true} onClick={() => onClickToast(2)} />
                }

                {
                    (!toasts || !toasts.includes(3)) &&
                    <Toast colour={'alert-danger'} persist={true} onClick={() => onClickToast(3)} />
                }

                {
                    (!toasts || !toasts.includes(4)) &&
                    <Toast colour={'alert-light'} persist={true} onClick={() => onClickToast(4)} />
                }

                {
                    (!toasts || !toasts.includes(5)) &&
                    <Toast colour={'alert-success'} persist={true} onClick={() => onClickToast(5)} />
                }
            </ToastWrapper>
        </>
    )
}
