import Button from '../../components/UI/Button'

import '../../App.scss'

export default {
    title: 'Components/UI/Button',
    component: Button,
    argTypes: {
        colour: { control: 'select' },
        size: { control: 'select' }
    }
}

const onClickButton = () => {
    alert('This is a button click from within StoryBook.')
}

const Template = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
    colour: 'btn-primary',
    text: 'Click Here',
    onClick: onClickButton
}