import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const TasksAdd = ({ task, onSave }) => {
    const [title, setTitle] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [reminder, setReminder] = useState(false)

    useEffect(() => {
        if (task) {
            setTitle(task.text)
            setDateTime(task.day)
            setReminder(task.reminder)
        }
    }, [task])

    const onSubmit = (e) => {
        e.preventDefault()

        // TODO: Validation

        onSave({ text: title, day: dateTime, reminder: reminder })

        setTitle('')
        setDateTime('')
        setReminder(false)
    }

    return (
        <div className='form-wrapper mt-3 mb-3 p-1 pt-3'>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' name='title' className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='dateTime'>Date &amp; Time</label>
                    <input type='text' id='dateTime' name='dateTime' className='form-control' value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='reminder'>Reminder</label>
                    <input type='checkbox' id='reminder' name='reminder' className='ml-2' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
                </div>
                <div className='form-group'>
                    <input type='submit' value='Save' className='btn btn-sm btn-secondary' />
                </div>
            </form>
        </div>
    )
}

TasksAdd.propTypes = {
    task: PropTypes.object,
    onSave: PropTypes.func
}

export default TasksAdd