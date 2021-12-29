import React, { Suspense, useState, useEffect } from 'react'
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom'

import Task from './components/Pages/Task'
import Tasks from './components/Pages/Tasks'
import Members from './components/Pages/Members'
import Welcome from './components/Pages/Welcome'
import Error404 from './components/Pages/Error404'

import Header from './components/UI/Header'
import Loading from './components/UI/Loading'
import Footer from './components/UI/Footer'
import Toasts from './components/UI/Toasts'
import Top from './components/UI/Top'

import authenticationService from './api/Authentication/AuthenticationService'

import './App.scss'

const About = React.lazy(() => import('./components/Pages/About'))
const People = React.lazy(() => import('./components/Pages/People'))
const Legal = React.lazy(() => import('./components/Pages/Legal'))
const Login = React.lazy(() => import('./components/Pages/Login'))

const App = () => {
    const navigate = useNavigate()
    const [showAdd, setShowAdd] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const authenticationService = getAuthenticationService()

        const user = authenticationService.get()

        setIsAuthenticated(user !== null)
    }, [])

    const onLogin = async () => {
        const authenticationService = getAuthenticationService()

        const user = await authenticationService.login('admin@admin.com', 'password')

        if (user) {
            setIsAuthenticated(true)
            navigate('/members', { replace: true })
        } else {
            throw new Error('Username and password are invalid.')
        }
    }

    const onLogout = () => {
        const authenticationService = getAuthenticationService()

        authenticationService.logout()

        setIsAuthenticated(false)

        navigate('/', { replace: true })
    }

    const whoAmI = () => {
        const authenticationService = getAuthenticationService()

        const user = authenticationService.get()

        if (!user) {
            return ''
        }

        return `${user.name} (${user.emailAddress})`
    }

    const getAuthenticationService = () => {
        return authenticationService()
    }

    return (
        <>
            <Header showLogin={isAuthenticated} />
            <main role='main' className='container'>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path='/' exact element={<Navigate to='/welcome' />} />
                        <Route path='/welcome' exact element={<Welcome production={process.env.NODE_ENV === 'production'} />} />
                        <Route path='/tasks' exact element={<Tasks showAdd={showAdd} onShowAdd={() => setShowAdd(!showAdd)} />} />
                        <Route path='/task/:id' element={<Task />} />
                        <Route path='/about/*' element={<About />} />
                        <Route path='/legal/*' element={<Legal />} />
                        <Route path='/people' exact element={<People />} />
                        <Route path='/login' element={<Login onLogin={onLogin} />} />
                        <Route path='/members/*' exact element={isAuthenticated ? <Members onLogout={onLogout} /> : <Error404 errorCode={'Error 401'} message={<>Nope! Not Authorized. =/</>} />}>
                            <Route path='who-am-i' element={<p>You are a logged in user {whoAmI()}.</p>} />
                        </Route>
                        <Route path='*' element={<Error404 />} />
                    </Routes>
                    <Top />
                </Suspense>
            </main>
            <Footer />
            <Toasts />
        </>
    )
}

export default App
