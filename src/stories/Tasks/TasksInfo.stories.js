import TasksInfo from '../../components/Tasks/TasksInfo'

import '../../App.scss'

export default {
    title: 'Components/Tasks/Task Information',
    component: TasksInfo
}

const Template = args => <TasksInfo {... args} />

export const Default = Template.bind({})
Default.args = {
    task: {
        id: 1, text: 'Hello World', day: `${new Date()}`, reminder: false
    }   
}

export const ReminderFlagged = Template.bind({})
ReminderFlagged.args = {
    task: { ...Default.args.task, reminder: true }    
}