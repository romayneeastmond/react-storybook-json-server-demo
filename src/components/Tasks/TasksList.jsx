import { useLocation } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import TasksInfo from './TasksInfo'

import Button from '../UI/Button'

const TasksList = ({ tasks, onDelete, onToggle }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const reminderParam = queryParams.get('reminder')

    if (reminderParam !== null && reminderParam === 'true') {
        tasks = tasks.filter(x => x.reminder === true)
    }

    const onReminder = () => {
        navigate('/tasks?reminder=true')
    }

    return (
        <>
            <Button text='Reminders' colour='btn-light' size='btn-sm' onClick={onReminder} className={'btn-outline-info'} />

            {
                location.search.toLowerCase().indexOf('?reminder=') !== -1 &&
                <Link className='small' to='/tasks' style={{ marginLeft: 10 }}>Reset Filter</Link>
            }

            {
                tasks.map((task) => (
                    <TasksInfo key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
                ))
            }

            {
                tasks.length === 0 &&
                <p className='mt-3'>No tasks matching this filter.</p>
            }
        </>
    )
}

TasksList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func
}

export default TasksList