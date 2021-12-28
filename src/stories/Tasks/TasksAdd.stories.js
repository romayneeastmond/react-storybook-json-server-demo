import TasksAdd from '../../components/Tasks/TasksAdd'

import '../../App.scss'

export default {
    title: 'Components/Tasks/Task Add',
    component: TasksAdd
}

const Template = args => <TasksAdd {... args} />

export const Default = Template.bind({})
Default.args = {
    
}

export const EditMode = Template.bind({})
EditMode.args = {
    task: {
        id: 1, text: 'Hello World', day: `${new Date()}`, reminder: false
    }   
}