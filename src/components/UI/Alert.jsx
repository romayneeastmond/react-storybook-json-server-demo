import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Alert = ({ colour, text, autoClick, onClick }) => {
    const alertRef = useRef(null)

    useEffect(() => {
        checkAutoClick()
    }, [])

    useEffect(() => {
        if (alertRef.current !== null && alertRef.current.classList !== null) {
            alertRef.current.classList.remove('element-fade-to-hidden')
        }

        checkAutoClick()
    }, [colour, text])

    const checkAutoClick = () => {
        if (autoClick && autoClick === true && onClick !== null) {
            const timer = setTimeout(() => onAutoClick(onClick), 3000)

            return () => clearTimeout(timer)
        }
    }

    const onAutoClick = (onClick) => {
        if (alertRef.current !== null && alertRef.current.classList !== null) {
            alertRef.current.classList !== null && alertRef.current.classList.add('element-fade-to-hidden')
        }

        setTimeout(() => {
            if (onClick !== null) {
                onClick()
            }
        }, 500)
    }

    const onAlertClick = (event, onClick) => {
        event.preventDefault()
        event.stopPropagation()

        onAutoClick(onClick)
    }

    return (
        <div ref={alertRef} className={`alert alert-dismissible fade show ${colour}`} role='alert'>
            {text}
            {
                (autoClick !== true && onClick !== null) &&
                <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={(e) => onAlertClick(e, onClick)}>
                    <span aria-hidden='true'>&times;</span>
                </button>
            }
        </div>
    )
}

Alert.defaultProps = {
    colour: 'alert-primary',
    text: <>Alert Raised</>,
    autoClick: false,
    onClick: null
}

Alert.propTypes = {
    colour: PropTypes.oneOf(['alert-primary', 'alert-secondary', 'alert-info', 'alert-success', 'alert-danger', 'alert-warning', 'alert-light', 'alert-dark']),
    text: PropTypes.element,
    autoClick: PropTypes.bool,
    onClick: PropTypes.func
}

export default Alert