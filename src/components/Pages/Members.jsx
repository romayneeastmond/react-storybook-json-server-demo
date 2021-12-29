import { Link, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

import useTitle from '../../hooks/use-title'

import Button from '../UI/Button'

const Members = ({ onLogout }) => {
    useTitle('Members Only')

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1 className='mb-3 mt-3'>Welcome Back Admin User</h1>
                    <h2></h2>
                    <p>
                        This is your guarded route that can only be accessed by logged in users.
                    </p>
                    <p>
                        Click <Link to='who-am-i'>here</Link> for more information.
                    </p>
                    <p>
                        <Button text='Logout' colour='btn-secondary' size='btn-sm' onClick={onLogout} />
                    </p>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

Members.propTypes = {
    onLogout: PropTypes.func.isRequired
}

export default Members