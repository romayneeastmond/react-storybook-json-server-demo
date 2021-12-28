import { useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types'

const Modal = ({ title, body, size, buttonOk, buttonCancel, persist, isDestroyed, onOkClick, onCancelClick, children }) => {
    const modalRef = useRef(null)
    const modalWrapperRef = useRef(null)
    const [destroyModal, setDestroyModal] = useState(false)

    useEffect(() => {
        document.body.classList.add('modal-open')

        if (modalWrapperRef.current !== null && modalWrapperRef.current.classList !== null) {
            modalWrapperRef.current.classList.add('show')
        }
    }, [])

    const onModalOkClick = () => {
        unload()

        if (onOkClick !== null) {
            onOkClick()
        }
    }

    const onModalCancelClick = () => {
        unload()

        if (onCancelClick !== null) {
            onCancelClick()
        }
    }

    const unload = () => {
        document.body.classList.remove('modal-open')

        if (modalRef.current !== null && modalRef.current.classList !== null) {
            modalRef.current.classList.remove('model-open')
        }

        if (isDestroyed !== null) {
            isDestroyed()
        } else {
            setDestroyModal(true)
        }
    }

    return (
        <>
            {
                (destroyModal !== true) &&
                <div ref={modalWrapperRef} className='modal fade' tabIndex='-1' role='dialog' onClick={(persist !== null && persist === false) ? unload : () => { }}>
                    <div ref={modalRef} className={`modal-dialog modal-dialog-centered modal-open ${size}`} role='document' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>{title}</h5>
                                {
                                    (persist !== null && persist === false) &&
                                    <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={unload}>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                }
                            </div>
                            <div className='modal-body'>
                                {body}

                                {children}
                            </div>
                            <div className='modal-footer'>
                                {
                                    (buttonOk !== '') &&
                                    <button type='button' className='btn btn-primary' onClick={onModalOkClick}>{buttonOk}</button>
                                }

                                {
                                    (buttonCancel !== '') &&
                                    <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={onModalCancelClick}>{buttonCancel}</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

Modal.defaultProps = {
    title: 'Modal Opened',
    body: <>Modal Content</>,
    size: 'default',
    buttonOk: '',
    buttonCancel: '',
    persist: false,
    isDestroyed: null,
    onOkClick: null,
    onCancelClick: null
}

Modal.propTypes = {
    title: PropTypes.string,
    body: PropTypes.element,
    size: PropTypes.oneOf(['default', 'modal-lg', 'modal-sm']),
    persist: PropTypes.bool,
    isDestroyed: PropTypes.func,
    onOkClick: PropTypes.func,
    onCancelClick: PropTypes.func
}

export default Modal