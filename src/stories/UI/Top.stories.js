import { Title, Subtitle, Description } from '@storybook/addon-docs';

import Top from '../../components/UI/Top'

import '../../App.scss'

export default {
    title: 'Components/UI/Top',
    component: Top,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <hr />
                    <p className='small'>Disabled Back to Top on this view because it displays a ridiculous amount of empty white space.</p>
                </>
            )
        }
    }
}

const Template = args => {
    return (
        <>
            <div className='small'>
                Scroll down to test the Back to Top component.
            </div>
            <hr />
            <div style={{ minHeight: '150vh'}}>
                <Top {...args} />
            </div>
        </>
    )
}

export const Default = Template.bind({})
Default.args = {

}