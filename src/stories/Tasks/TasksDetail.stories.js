import TasksAdd from '../../components/Tasks/TasksAdd'
import TasksDetail from '../../components/Tasks/TasksDetail'

import '../../App.scss'

export default {
    title: 'Components/Tasks/Task Details',
    component: TasksDetail,
    subcomponents: {
        TasksAdd
    },
    argTypes: {
        mockTasksService: { table: { disable: true } }
    }
}

export const Default = args => {
    const getMockTasksService = () => {
        const get = async (id = 1) => {
            return {
                id: id, text: 'Hello World', day: `${new Date()}`, reminder: false
            }
        }
    
        const update = async (id = 1, data) => {
            console.log(data, id)
    
            return data
        }
    
        return {
            get,
            update
        }
    }

    return (
        <TasksDetail mockTasksService={getMockTasksService} {...args} />
    )
}