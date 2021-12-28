import Loading from '../../components/UI/Loading'

import '../../App.scss'

export default {
    title: 'Components/UI/Suspense',
    component: Loading
}

const Template = args => <Loading {...args} />

export const Default = Template.bind({})
Default.args = {

}