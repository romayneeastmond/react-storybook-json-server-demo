import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = ({ title, showLogin }) => {
    return (
        <header>
            <div className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow'>
                <h5 className='my-0 mr-md-auto font-weight-normal logo'><Link to='/'>{title}</Link></h5>
                <nav className='my-2 my-md-0 mr-md-3'>
                    <NavLink className='p-2 mr-1 text-dark btn btn-sm btn-outline-light' to='/about'>About</NavLink>
                    <NavLink className='p-2 mr-1 text-dark btn btn-sm btn-outline-light' to='/tasks'>Tasks</NavLink>                    
                    <NavLink className='p-2 mr-1 text-dark btn btn-sm btn-outline-light' to='/people'>People</NavLink>                    
                    <NavLink className='p-2 mr-1 text-dark btn btn-sm btn-outline-light' to='/members'>Members</NavLink>
                    {
                        !showLogin &&
                        <NavLink className='p-2 text-dark btn btn-sm btn-outline-secondary' to='/login'>Login</NavLink>
                    }
                </nav>
            </div>
        </header>
    )
}

Header.defaultProps = {
    title: 'React Demo',
    showLogin: false
}

Header.propTypes = {
    title: PropTypes.string,
    showLogin: PropTypes.bool
}

export default Header