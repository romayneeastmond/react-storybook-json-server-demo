import useState from 'storybook-addon-state'
import { Title, Subtitle, Description, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs'

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
        numberOfRecordsPerPage: {
            description: 'Affects the calculation of the pager element. The actual data should be paginated accordingly.'
        }
    },
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <hr />
                    <p className='small'>Pagination relies on Storybook useState which is unavailable on this view.</p>
                    <ArgsTable story={PRIMARY_STORY} />
                </>
            )
        }
    },
    excludeStories: /.*Data$/
}

const paginationSettingsDataSize = 2000
const paginationSettingsPageSize = 10

export const randomPasswordData = (size) => {
    if (size === !NaN || size < 0) {
        size = 10
    }

    let passwordData = []

    for (let i = 0; i < size; i++) {
        passwordData.push(
            { id: i, index: `${i + 1}.`, password: btoa(Math.floor((Math.random() * 10000000) + 1)) }
        )
    }

    return passwordData
}

const paginationSettingsData = randomPasswordData(paginationSettingsDataSize)

export const Pagination = args => {
    const [data, setData] = useState('randomPasswordData', paginationSettingsData.slice(0, paginationSettingsPageSize))
    const [limit, setLimit] = useState('recordsPerPage', paginationSettingsPageSize)

    const onPaginationSettingsPagerClick = (data) => {
        var temporaryData = paginationSettingsData.slice(data.startIndex, data.endIndex)

        setData(temporaryData)
        setLimit(data.pageSize)
    }    

    args = {
        ...args,
        data: data,
        numberOfRecordsPerPage: limit,
        onPagerClick: onPaginationSettingsPagerClick
    }    

    return (
        <>
            <div className='small'>
                <p>
                    Pagination relies on Storybook useState which is unavailable on the 'Docs' view.
                </p>
            </div>
            <hr />

            <Listing {...args} />
        </>
    )
}

Pagination.args = {
    data: paginationSettingsData.slice(0, paginationSettingsPageSize),
    totalNumberOfRecords: paginationSettingsDataSize,    
    headings: [
        { id: 'index', display: '', width: '50px', alignment: 'right', sortable: false },
        { id: 'password', display: 'Password', sortable: false }
    ],
    actions: ['Hide'],
    currentPagerPage: 1,
    maximumPagerLinks: 10,
    loading: false,
    empty: <>There is no paginated data at this moment.</>
}