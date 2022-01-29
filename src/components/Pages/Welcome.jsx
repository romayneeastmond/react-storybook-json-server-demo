import PropTypes from 'prop-types'
import { FaArrowRight } from 'react-icons/fa'

const Welcome = ({ production }) => {
    return (
        <>
            <div className='jumbotron text-center'>
                <h1>React Demo Project</h1>

                <p>
                    This project shows the basic features associated with creating a vanilla React application capable of organizing features
                    into separate pages using a Single Page Application (SPA) approach.
                </p>

                {
                    (production === true) &&
                    <>
                        <h2 className='h3 mt-5'>Storybook UI Documentation</h2>
                        <p>
                            Although this project uses Bootstrap, via CDN (i.e <strong>not</strong> React Bootstrap), for styling of components; all reusable elements
                            (Alert, Button, Card, Modal, Pager, and Toast) were created to demonstrate React props and state management.
                        </p>
                        <p>
                            <a className='btn btn-sm btn-info' href='https://dev-react-demo-storybook-re01.azurewebsites.net/' target='_blank' role='button' rel="noreferrer">Click to view Storybook <FaArrowRight /></a>
                        </p>
                    </>
                }
            </div>
            <div className='row mb-4'>
                <div className='col'>
                    <h2 className='h3'>Getting Started with React</h2>

                    <p>
                        To get started with a vanilla application run the following commands in console.
                    </p>
                    <div className='highlight alert bg-light'>
                        npx create-react-app my-app<br />
                        cd my-app<br />
                        npm start<br />
                    </div>
                </div>
            </div>
            <div className='row mb-4'>
                <div className='col'>
                    <h4>Other Useful Packages</h4>

                    <p>
                        ReactDOM for setting Routes, Redux and or Redux Toolkit for application wide state management, React Icons for icon libraries such as Font Awesome,
                        dotenv for reading environment variables, and Sass to add support for advanced stylesheets. {(production === true) && <>And of course Storybook for UI testing and documentation.</>}
                    </p>
                    <div className='highlight alert bg-light'>
                        npm i react-dom<br />
                        npm i redux<br />
                        npm i @reduxjs/toolkit<br />
                        npm i react-icons<br />
                        npm i dotenv<br />
                        npm i sass<br />
                        {(production === true) && <>npx sb init</>}
                    </div>
                </div>
            </div>
            <div className='row mb-4'>
                <div className='col'>
                    <h4>Bootstrap</h4>

                    <p>
                        There is a full React Bootstap component library package available. However simply edit the <strong>/public/index.html</strong> file to add support via CDN.
                    </p>
                </div>
            </div>
            <div className='row mb-4'>
                <div className='col'>
                    <h4>Final Setup</h4>

                    <p>
                        Add universal ErrorHandler, BrowserRouter, and redux Provider to the <strong>/index.jsx</strong> file. Additionally
                        any Portals can be defined along side the default <strong>&lt;div id="root"&gt;&lt;/div&gt;</strong> tag located inside <strong>/public/index.html</strong>.
                    </p>
                </div>
            </div>
        </>
    )
}

Welcome.defaultProps = {
    production: false
}

Welcome.propTypes = {
    production: PropTypes.bool
}

export default Welcome