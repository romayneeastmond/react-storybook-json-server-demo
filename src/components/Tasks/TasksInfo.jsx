import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaTrashAlt } from 'react-icons/fa'

const TasksInfo = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task card box-shadow ${task.reminder ? 'task-active' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <div className='card-header'>
                <h4 className='my-0 font-weight-normal'>
                    <Link to={`/task/${task.id}`}>{task.text}</Link>
                </h4>
            </div>
            <div className='task-body card-body'>
                <p>
                    {task.day}
                </p>

                <FaTrashAlt style={{ color: '#c82333', cursor: 'pointer' }} onClick={() => onDelete(task)} />
            </div>
        </div>
    )
}

TasksInfo.propTypes = {
    task: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func
}

export default TasksInfo