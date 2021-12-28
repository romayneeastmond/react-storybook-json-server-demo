import { Link, Routes, Route } from 'react-router-dom'

const About = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1 className='mb-3 mt-3'>About React Demo</h1>

                    <p className='mt-3'>
                        <Link to='/'>Back to Welcome</Link>
                    </p>
                </div>
            </div>

            <div className='row'>
                <div className='col'>                    
                    <h2 className='h4 mt-4'>Defining Routes at the Page Level</h2>
                    <p>
                        The following links demonstrate how Routes can be defined at the page level instead of withing the default <strong>App.jsx</strong> file. Where
                        as other routes defined at that level use the <strong>&lt;Outlet /&gt;</strong> component provided by <strong>react-router-dom</strong>.
                    </p>

                    <p>
                        <br />
                        <Link to='demo'>About Tasks Demo</Link>
                        <br />
                        <Link to='/about/nav'>About Not Using a Nav</Link>
                    </p>

                    <Routes>
                        <Route path='demo' element={<p>This is just a sub route demonstration with relative path.</p>} />
                        <Route path='nav' element={<p>Should use a nav for sub route that uses an absolute path.</p>} />
                    </Routes>
                </div>
            </div>

            <div className='row mb-4'>
                <div className='col'>
                <hr />
                <h3 className='h4 mt-4'>Now to the Actual About Information</h3>
                </div>
            </div>

            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4'>
                    <h4 className='h5'>Tasks</h4>
                    <p>
                        This section is a basic '<Link to='/tasks'>to-do</Link>' application that has Create, Retrieve, Update, and Delete (CRUD) operations.
                    </p>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4'>
                    <h4 className='h5'>People</h4>
                    <p>
                        This page simply lists dummy records using a custom built <Link to='/people'>listing and pager</Link> component.
                    </p>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4'>
                    <h4 className='h5'>Members</h4>
                    <p>
                        Simply a demonstration of <Link to='/members'>protected routes</Link> and calling the Authentication Api. To access this section use
                        the <Link to='/login'>Login</Link> link located in the header menu.
                    </p>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4'>
                    <h4 className='h5'>Legal</h4>
                    <p>
                        A link found directly in the footer area as a place to demonstrate the resuable <Link to='/legal'>Modal component</Link>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About