import Welcome from '../../components/Pages/Welcome'

import '../../App.scss'

export default {
    title: 'Pages/Dynamic/Home Page',
    component: Welcome
}

const Template = args => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Welcome {...args} />
                </div>
            </div>
        </div>
    )
}

export const Default = Template.bind({})
Default.args = {

}

export const Production = Template.bind({})
Production.args = {
    production: true
}