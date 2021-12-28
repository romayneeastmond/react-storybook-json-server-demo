import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Login = ({ onLogin }) => {
    useEffect(() => {
        const load = async () => {
            await onLogin()
        }

        load()
    }, [onLogin])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <p className='mt-3'>Redirecting to members page.</p>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired
}

export default Login