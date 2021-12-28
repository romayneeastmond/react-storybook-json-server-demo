import Header from '../../components/UI/Header'

import '../../App.scss'

export default {
    title: 'Components/UI/Header',
    component: Header    
}

const Template = args => <Header {... args} />

export const Default = Template.bind({})
Default.args = {
    
}

export const CustomTitle = Template.bind({})
CustomTitle.args = {
    title: 'StoryBook Demo'
}

export const HideLogin = Template.bind({})
HideLogin.args = {
    title: 'StoryBook Demo',
    showLogin: true
}