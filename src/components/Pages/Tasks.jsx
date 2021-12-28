import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaSpinner } from 'react-icons/fa'

import TasksAdd from '../Tasks/TasksAdd'
import TasksList from '../Tasks/TasksList'

import Alert from '../UI/Alert'
import Button from '../UI/Button'
import Modal from '../UI/Modal'

import tasksService from '../../api/Tasks/TasksService'

const Tasks = ({ showAdd, onShowAdd }) => {
    const [tasks, setTasks] = useState([])
    const [addMessage, setAddMessage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalDeleteRecord, setModalDeleteRecord] = useState(0)
    const [modalDeleteRecordText, setModalDeleteRecordText] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const tasksService = getTasksService()

            const tasksList = await tasksService.list()

            setTasks(tasksList)
            setLoading(false)
        }

        load()
    }, [])

    const getTasksService = () => {
        return tasksService()
    }

    const addTask = async (task) => {
        setAddMessage('')

        const tasksService = getTasksService()

        const data = await tasksService.add(task)

        if (data) {
            setTasks([...tasks, data])
            setAddMessage('success')
            onShowAdd()
        } else {
            setAddMessage('error')
        }
    }

    const deleteTask = (task) => {
        setModalDeleteRecord(task.id)
        setModalDeleteRecordText(task.text)
        setShowModal(true)
    }

    const onModalOk = async () => {
        setAddMessage('')
        const tasksService = getTasksService()

        await tasksService.remove(+modalDeleteRecord)

        setTasks(tasks.filter((task) => task.id !== +modalDeleteRecord))
        setAddMessage('delete')
        setShowModal(false)
        setModalDeleteRecord(0)
        window.scrollTo(0, 0)
    }

    const onModalCancel = () => {
        setShowModal(false)
        setModalDeleteRecord(0)
    }

    const toggleTaskReminder = async (id) => {
        const tasksService = getTasksService()

        const currentTask = await tasksService.get(id)
        const updatedTask = { ...currentTask, reminder: !currentTask.reminder }

        const data = await tasksService.update(id, updatedTask)

        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    }

    const onAlertClick = () => {
        setAddMessage('')
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <h1 className='mb-3 mt-3'>Tasks</h1>

                    <div className='tasks-add-wrapper'>
                        <Button text={showAdd ? 'Close' : 'Add'} colour={showAdd ? 'btn-danger' : 'btn-success'} size={'btn-sm'} onClick={onShowAdd} />
                    </div>

                    {
                        addMessage === 'success' &&
                        <Alert colour={'alert-success'} text={<><strong>Success!</strong> New task has been added.</>} onClick={onAlertClick} />
                    }

                    {
                        addMessage === 'error' &&
                        <Alert colour={'alert-danger'} text={<><strong>Error!</strong> Sorry the changes were not made successfully.</>} onClick={onAlertClick} />
                    }

                    {
                        addMessage === 'delete' &&
                        <Alert colour={'alert-info'} text={<><strong>Deleted!</strong> A task has been deleted.</>} onClick={onAlertClick} />
                    }

                    {
                        showAdd &&
                        <TasksAdd onSave={addTask} />
                    }

                    <Outlet />

                    {
                        tasks.length > 0 ? (
                            <>
                                {
                                    (showModal === true) &&
                                    <Modal title={'Delete Confirmation'} body={<></>} buttonOk={'Delete'} buttonCancel={'Cancel'} onOkClick={onModalOk} onCancelClick={onModalCancel} persist={true}>
                                        <p>
                                            Are you sure that you want to delete the currently selected task (<strong>{`${modalDeleteRecordText}`}</strong>)? This process cannot be undone.
                                        </p>
                                    </Modal>
                                }

                                <TasksList tasks={tasks} onDelete={deleteTask} onToggle={toggleTaskReminder} />
                            </>
                        ) : (
                            <>
                                {
                                    loading === true &&
                                    <FaSpinner className='spinner' />
                                }

                                {
                                    loading === false &&
                                    <p className='mt-3'>No tasks have been added.</p>
                                }
                            </>
                        )
                    }
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <h2 className='h5 mb-3 mt-3'>Features</h2>

                    <div className='small'>
                        <p>
                            This section is a basic 'to-do' application that features a number of components.
                        </p>
                        <p>
                            The Add button located near the top heading changes state on click to toggle the display of the <strong>TasksAdd</strong> component.
                        </p>
                        <p>
                            Each <strong>TasksInfo</strong> component can be double clicked to change the reminder status to true.
                            This also demonstrates conditional CSS styles based on state changes.
                        </p>
                        <p>
                            The Reminders button uses the <strong>useNavigation</strong> hook provided by <strong>react-router-dom</strong> to inject a query string
                            into the URL. It then filters the tasks list based on the reminder status.
                        </p>
                        <p>
                            Clicking on the task title will navigate to the <strong>TasksDetail</strong> component.
                        </p>
                        <p>
                            Finally each delete icon is generated from the trash can icon provided by <strong>react-icons/fa</strong>
                        </p>
                        <hr />
                        <h3 className='h5 mt-4'>Bootstrap</h3>
                        <p>
                            This section is also generated by using the Button, Card, Alert, and Modal components provided by Bootstrap via CDN.
                        </p>
                        <hr />
                        <h3 className='h5 mt-4'>Tasks Api</h3>
                        <p>
                            The Api for this particular section is generated by the <strong>JSON Server</strong> package.
                        </p>
                        <div className='highlight alert bg-light'>
                            npm i json-server<br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Tasks.propTypes = {
    showAdd: PropTypes.bool,
    onShowAdd: PropTypes.func
}

export default Tasks