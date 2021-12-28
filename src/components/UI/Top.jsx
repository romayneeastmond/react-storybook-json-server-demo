import { useEffect, useRef } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const Top = () => {
    const toTopRef = useRef(null)

    useEffect(() => {
        window.addEventListener('scroll', () => { showTopScroll(window.scrollY) })
    }, [])

    const showTopScroll = (bounds) => {
        if (toTopRef === null || toTopRef.current === null) {
            return
        }

        if (bounds > 135) {
            toTopRef.current.classList.add('show')
        } else {
            toTopRef.current.classList.remove('show')
        }
    }

    const onTopClick = (e) => {
        e.preventDefault()

        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            <a ref={toTopRef} className='scroll-top box-shadow' href='' onClick={(e) => onTopClick(e)}>
                <span className='scroll-top-tooltip'>Back to Top</span>

                <FaArrowUp className='scroll-top-icon' />
            </a>
        </>
    )
}

export default Top