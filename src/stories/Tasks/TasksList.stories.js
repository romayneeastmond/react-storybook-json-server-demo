import TasksInfo from '../../components/Tasks/TasksInfo'
import TasksList from '../../components/Tasks/TasksList'

import '../../App.scss'

export default {
    title: 'Components/Tasks/Task List',
    component: TasksList,
    subcomponents: {
        TasksInfo
    }
}

const Template = args => <TasksList {...args} />

export const Default = Template.bind({})
Default.args = {
    tasks: []
}

export const Listing = Template.bind({})
Listing.args = {
    tasks: [
        {
            id: 1, text: 'Hello World', day: `${new Date()}`, reminder: false
        },
        {
            id: 2, text: 'Hello from Next Month', day: `${new Date(new Date().setMonth(new Date().getMonth()+1))}`, reminder: true
        }
    ]
}