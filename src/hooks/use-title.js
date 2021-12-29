import { useEffect } from 'react'

const useTitle = (title) => {
    useEffect(() => {
        const previousTitle = document.title

        document.title = `${process.env.REACT_APP_WEBSITE_TITLE} | ${title}`

        return () => {
            document.title = previousTitle
        }
    }, [])
}

export default useTitle