import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Toast = ({ colour, title, subTitle, text, icon, persist, onClick }) => {
    const toastRef = useRef(null)

    useEffect(() => {
        checkAutoHide()
    }, [])

    useEffect(() => {
        if (toastRef.current !== null && toastRef.current.classList !== null) {
            toastRef.current.classList = 'toast show'
        }

        checkAutoHide()
    }, [colour, title, subTitle, text, icon, persist])

    const checkAutoHide = () => {
        if (persist !== null && persist === false) {
            const timer = setTimeout(() => onAutoHide(onClick), 3000)

            return () => clearTimeout(timer)
        }
    }

    const onAutoHide = (onClick) => {
        if (toastRef.current !== null && toastRef.current.classList !== null) {
            toastRef.current.classList = 'toast element-fade-to-hidden'
        }

        setTimeout(() => {
            if (onClick !== null) {
                onClick()
            }
        }, 1000);
    }

    const onToastClick = (onClick) => {
        onAutoHide(onClick)
    }

    return (
        <div ref={toastRef} className={'toast show'} role='alert' aria-live='assertive' aria-atomic='true'>
            <div className={`toast-header ${colour}`}>
                {icon}
                <strong className='mr-auto'>{title}</strong>
                <small className="text-muted">{subTitle}</small>
                <button type='button' className='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close' onClick={() => onToastClick(onClick)}>
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
            <div className='toast-body'>
                <div>{text}</div>
            </div>
        </div>
    )
}

Toast.defaultProps = {
    colour: 'alert-primary',
    title: 'Toast',
    subTitle: '',
    text: <>Toast Raised</>,
    persist: false,
    onClick: null
}

Toast.propTypes = {
    colour: PropTypes.oneOf(['alert-primary', 'alert-secondary', 'alert-info', 'alert-success', 'alert-danger', 'alert-warning', 'alert-light', 'alert-dark']),
    title: PropTypes.string,
    subTitle: PropTypes.string,
    text: PropTypes.element,
    icon: PropTypes.element,
    persist: PropTypes.bool,
    onClick: PropTypes.func,
}

export default Toast