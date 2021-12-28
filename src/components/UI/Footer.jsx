import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Footer = ({ copyright }) => {
    return (
        <footer className='footer'>
            <div className='container'>
                <span className='text-muted'>&copy; {copyright} <Link to='/about'>About</Link> | <Link to='/legal'>Legal</Link></span>
            </div>
        </footer>
    )
}

Footer.defaultProps = {
    copyright: 'React Demo Footer.'
}

Footer.propTypes = {
    copyright: PropTypes.string
}

export default Footer