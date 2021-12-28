import PropTypes from 'prop-types'

const Button = ({ colour, size, text, onClick }) => {
    return (
        <button onClick={onClick} className={`btn ${colour} ${size}`}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    colour: 'btn-primary',
    size: 'default',
    text: 'Click Here'
}

Button.propTypes = {
    colour: PropTypes.oneOf(['btn-primary', 'btn-secondary', 'btn-info', 'btn-success', 'btn-danger', 'btn-warning', 'btn-light', 'btn-dark', 'btn-link']),
    size: PropTypes.oneOf(['default', 'btn-lg', 'btn-sm']),
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Button