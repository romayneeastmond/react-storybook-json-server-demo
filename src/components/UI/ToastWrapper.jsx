const ToastWrapper = (props) => {
    return (
        <div className='toast-wrapper' aria-live='polite' aria-atomic='true'>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default ToastWrapper