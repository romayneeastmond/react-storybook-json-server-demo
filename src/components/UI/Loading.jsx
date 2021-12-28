import { FaCircleNotch } from 'react-icons/fa'

const Loading = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='suspense'>
                        <FaCircleNotch className='spinner' size={84} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading