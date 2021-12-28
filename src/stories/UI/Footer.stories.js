import Footer from '../../components/UI/Footer'

import '../../App.scss'

export default {
    title: 'Components/UI/Footer',
    component: Footer
}

const Template = args => (
    <Footer {...args} />
)

export const Default = Template.bind({})
Default.args = {

}

export const CustomCopyright = Template.bind({})
CustomCopyright.args = {
    copyright: `${new Date().getFullYear()} All rights Reserved. StoryBook Demo.`
}