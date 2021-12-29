import PropTypes from 'prop-types'

import useTitle from '../../hooks/use-title'

const Error404 = ({ errorCode, message, children }) => {
    useTitle('Error')

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1 className='mb-3 mt-3'>{errorCode}</h1>

                    <p className='display-4'>
                        {message}
                    </p>

                    {children}
                </div>
            </div>
        </div>
    )
}

Error404.defaultProps = {
    errorCode: 'Error 404',
    message: <>='/</>
}

Error404.propTypes = {
    errorCode: PropTypes.string,
    message: PropTypes.element
}

export default Error404