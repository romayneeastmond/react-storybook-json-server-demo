import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa'

import { push } from '../../store/notificationToastsSlice'

import TasksAdd from './TasksAdd'

import tasksService from '../../api/Tasks/TasksService'

const TasksDetail = ({ mockTasksService }) => {
    const dispatchToast = useDispatch()

    const params = useParams()

    const [task, setTask] = useState({})
    const [showEdit, setShowEdit] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const tasksService = getTasksService()

            const taskItem = await tasksService.get(params.id)

            setTask(taskItem)
            setLoading(false)
        }

        load()
    }, [params.id])

    const getTasksService = () => {
        if (mockTasksService) {
            return mockTasksService()
        }

        return tasksService()
    }

    const editTask = async (task) => {
        const tasksService = getTasksService()

        const data = await tasksService.update(params.id, task)

        if (data) {
            setTask(data)

            dispatchToast(push({
                colour: 'alert-success',
                title: 'Task Details',
                text: 'Successfully saved changes.'
            }))
        } else {
            dispatchToast(push({
                colour: 'alert-danger',
                title: 'Task Details',
                text: 'Changes were not made successfully.'
            }))
        }

        setShowEdit(false)
    }

    const onShowEdit = () => {
        setShowEdit(!showEdit)
    }

    return (
        <>
            <h1 className='mb-3 mt-3'>Details</h1>
            <p className='mt-3'>
                <Link to='/tasks'>Back to Task Listing</Link>
            </p>

            {
                ((task !== null || typeof task !== 'undefined') && Object.keys(task).length !== 0) ? (
                    <>
                        <div className={`task card box-shadow ${task.reminder ? 'task-active' : ''}`} >
                            <div className='card-header'>
                                <h4 className='my-0 font-weight-normal'>
                                    {task.text}
                                </h4>
                            </div>

                            <div className='task-body card-body'>
                                <p>
                                    {task.day}
                                </p>

                                <FaEdit style={{ color: `${showEdit ? '#c82333' : '#333'}`, cursor: 'pointer' }} onClick={() => onShowEdit()} />
                            </div>

                        </div>

                        {
                            showEdit &&
                            <TasksAdd task={task} onSave={editTask} />
                        }
                    </>

                ) : (
                    <>
                        {
                            loading === true &&
                            <FaSpinner className='spinner' />
                        }

                        {
                            loading === false &&
                            <p className='mt-3'>Invalid task.</p>
                        }
                    </>
                )
            }
        </>
    )
}

TasksDetail.propTypes = {
    mockTasksService: PropTypes.func
}

export default TasksDetail