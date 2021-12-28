import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../UI/Button'
import Modal from '../UI/Modal'

const Legal = () => {
    const [showModal, setShowModal] = useState(false)

    const onShowModal = () => {
        setShowModal(true)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <>
            {
                (showModal === true) &&
                <Modal title={'Legal Terms'} body={<></>} buttonOk={'Close'} size={'modal-lg'} onOkClick={hideModal} isDestroyed={hideModal}>
                    <p>
                        An example of a Modal with props.children
                    </p>
                </Modal>
            }

            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1 className='mb-3 mt-3'>Legal Terms</h1>

                        <p className='mt-3'>
                            <Link to='/'>Back to Welcome</Link>
                        </p>
                        <p>
                            There are actually no Terms of Use, Disclaimer or Privacy Policy statements.
                        </p>
                        <p>
                            However on this page is a demonstatration of the Modal component.
                        </p>

                        <Button text={'Show Modal'} size={'btn-sm'} colour={'btn-secondary'} onClick={() => onShowModal()} />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Legal