import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../src/store/index'

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    }
}

export const decorators = [
    (Story) => (
        <Router>
            <Provider store={store}>
                <Story />
            </Provider>
        </Router>
    ),
]