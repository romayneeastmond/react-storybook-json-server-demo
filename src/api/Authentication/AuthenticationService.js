const authenticationService = () => {
    const apiUrl = `${process.env.REACT_APP_API_ADDRESS}users`
    const authenticationLocalStorageKey = 'REACT_TASKS_DEMO-LoggedInUser'

    const get = () => {
        return JSON.parse(localStorage.getItem(authenticationLocalStorageKey))
    }

    const login = async (emailAddress, password) => {
        const res = await fetch(`${apiUrl}/?emailAddress=${emailAddress}`)

        const data = await res.json()

        if (!res.ok) {
            
        }

        if (data.length && data[0].password === password) {
            const user = { ...data[0], password: '' }

            localStorage.setItem(authenticationLocalStorageKey, JSON.stringify(user))

            return user
        }

        return null
    }

    const logout = () => {
        localStorage.removeItem(authenticationLocalStorageKey)
    }

    return {
        apiUrl,
        authenticationLocalStorageKey,
        get,
        login,
        logout
    }
}

export default authenticationService