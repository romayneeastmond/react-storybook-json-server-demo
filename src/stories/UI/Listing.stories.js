import { Link } from 'react-router-dom'

import Listing from '../../components/UI/Listing'

import '../../App.scss'

export default {
    title: 'Components/UI/Listing',
    component: Listing,
    argTypes: {
        data: {
            defaultValue: []
        },
        headings: {
            defaultValue: []
        },
        actions: {
            defaultValue: []
        },
        empty: {
            control: {
                type: null
            }
        },
        emptyString: {
            name: 'Empty String (empty)',
            type: {
                name: 'string',
                required: false
            },
            defaultValue: 'No matches found or query returned no data.',
            description: 'String value that is copied into the disabled empty: PropTypes.element',
            table: {
                type: {
                    summary: 'string'
                },
                defaultValue: {
                    summary: 'No matches found or query returned no data.'
                },
            },
            control: {
                type: 'text'
            }
        },
        numberOfRecordsPerPage: {
            description: 'Affects the calculation of the pager element. The actual data should be paginated accordingly.'
        }
    }
}

const onSortClick = (data) => {
    console.log('onSortClick StoryBook.', data)
}

const onPagerClick = (data) => {
    console.log('onPagerClick StoryBook.', data)
}

const onActionsClick = (data) => {
    console.log('onActionsClick StoryBook.', data)
}

const Template = ({ emptyString, ...args }) => (
    <Listing empty={<>{emptyString}</>} {...args} />
)

export const Default = Template.bind({})
Default.args = {

}

export const SimpleListing = Template.bind({})
SimpleListing.args = {
    data: [
        { id: 1, name: 'Hello World', completed: 'Yes' },
        { id: 2, name: 'Foo Bar', completed: 'No' },
    ],
    totalNumberOfRecords: 2,
    headings: [
        { id: 'id', display: 'Id', width: '40px', alignment: 'right', sortable: false },
        { id: 'name', display: 'Name', sortOn: 'name', sortDirection: 'asc' },
        { id: 'completed', display: 'Completed', alignment: 'center', width: '120px' }
    ],
    ...Default.args,
}

export const LoadingState = Template.bind({})
LoadingState.args = {
    ...SimpleListing.args,
    loading: true
}

export const Actions = Template.bind({})
Actions.args = {
    ...SimpleListing.args,
    actions: [
        'Completed'
    ]
}

export const ActionsAndLinking = Template.bind({})
ActionsAndLinking.args = {
    ...Actions.args,
    data: [...Actions.args.data.map((d) => d && { ...d, name: <Link to=''>{d.name}</Link> })]
}

export const ClickEvents = ({ ...args }) => {
    return (
        <>
            <div className='small'>
                Use the browser console to view the events returned from clicking on columns, pager, and actions.
            </div>
            <hr />

            <Listing
                {...args}
                data={Actions.args.data}
                totalNumberOfRecords={Actions.args.totalNumberOfRecords}
                headings={Actions.args.headings}
                actions={Actions.args.actions}
                onSortClick={onSortClick}
                onPagerClick={onPagerClick}
                onActionsClick={onActionsClick}
            />
        </>
    )
}

ClickEvents.argTypes = {
    emptyText: {
        control: {
            type: null
        }
    }
}