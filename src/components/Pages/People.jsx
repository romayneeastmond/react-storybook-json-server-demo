import { Link } from 'react-router-dom'

import Listing from '../UI/Listing'

const People = () => {
    const data = [
        {
            id: 1,
            index: '1.',
            name: <Link to='/person/1'>John Doe</Link>,
            emailAddress: <a href='mailto: doej@person.com'>doej@person.com</a>,
            accessText: 'Public'
        },
        {
            id: 2,
            index: '2.',
            name: <Link to='/person/2'>Ben Dover</Link>,
            emailAddress: <a href='mailto: doverb@person.com'>doverb@person.com</a>,
            accessText: 'Private'
        }
    ]

    const headings = [
        { id: 'index', display: '', width: '40px', alignment: 'right', sortable: false },
        { id: 'name', display: 'Name', sortOn: 'name', sortDirection: 'asc' },
        { id: 'emailAddress', display: 'Email Address', width: '200px' },
        { id: 'accessText', display: 'Access', width: '60px', alignment: 'center', sortable: false }
    ]

    const actions = [
        'Public',
        'Private',
        'Delete'
    ]

    const onActionsClick = (data) => {
        //TODO: Call Api based on action and selected records

        console.log(data)
    }

    const onPagerClick = (data) => {
        if (data && data.sortedOn) {
            pagination(+data.startIndex, +data.pageSize, data.sortedOn, (data.sortDirection === 'asc'))
        }

        console.log(data)
    }

    const onSortClick = (data) => {
        if (data) {
            pagination(+data.startIndex, +data.pageSize, data.sortedOn, (data.sortDirection === 'asc'))
        }

        console.log(data)
    }

    const pagination = (startIndex, pageSize, orderBy, sorted) => {
        const records = {
            startIndex,
            pageSize,
            orderBy,
            sorted
        }

        if (records) {
            // TODO: Repopulate data state
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1 className='mb-3 mt-3'>People</h1>

                    <Listing data={data} totalNumberOfRecords={data.length} headings={headings} actions={actions} onSortClick={onSortClick} onPagerClick={onPagerClick} onActionsClick={onActionsClick} />
                </div>
            </div>
        </div>
    )
}

export default People