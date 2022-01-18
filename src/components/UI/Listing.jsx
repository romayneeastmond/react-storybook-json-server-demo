import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FaArrowDown } from 'react-icons/fa'
import { FaArrowUp } from 'react-icons/fa'
import { FaCircleNotch } from 'react-icons/fa'

const Listing = ({ data, headings, totalNumberOfRecords, actions, empty, loading, currentPagerPage, numberOfRecordsPerPage, maximumPagerLinks, onSortClick, onPagerClick, onActionsClick }) => {
    const [records, setRecords] = useState([])
    const [columns, setColumns] = useState([])
    const [total, setTotal] = useState(0)
    const [allowedActions, setAllowedActions] = useState([])
    const [emptyMessage, setEmptyMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [sortedOn, setSortedOn] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')
    const [pagerSettings, setPagerSettings] = useState({})
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [pageSize, setPageSize] = useState(10)

    const selectAllowedActionsRef = useRef(null)

    useEffect(() => {
        setRecords(data ? data.map((record) => record && { ...record, checked: false }) : [])
        setColumns(headings)
        setTotal(totalNumberOfRecords)
        setAllowedActions(actions)
        setEmptyMessage(empty)
        setIsLoading(loading)
        setPage(currentPagerPage)
        setLimit(numberOfRecordsPerPage)
        setPageSize(maximumPagerLinks)
    }, [data, headings, totalNumberOfRecords, actions, empty, loading, currentPagerPage, numberOfRecordsPerPage, maximumPagerLinks])

    useEffect(() => {
        setRecords(data ? data.map((record) => record && { ...record, checked: false }) : [])        
    }, [data])

    useEffect(() => {
        setPagerSettings(getPagerSettings(total, page, limit, pageSize))
    }, [total, page, limit, pageSize])

    const getColumnStyle = (column) => {
        if (!column) {
            return {}
        }

        let styles = {}

        if (column.width) {
            styles.width = column.width
        }

        if (column.alignment) {
            styles.textAlign = column.alignment
        }

        return styles
    }

    const getHeaderDisplay = (column) => {
        if (column.sortable !== null && column.sortable === false) {
            return column.display
        }

        if (column.sortedDefault !== null && column.sortedDefault === true) {
            setSortedOn(column.id)

            if (column.sortOn) {
                setSortedOn(column.sortOn)
            }
        }

        return <span className='listing-column-sortable'>{column.display}</span>
    }

    const getPagerData = (currentPagerSettings) => {
        const data = {
            startIndex: currentPagerSettings.startIndex,
            endIndex: currentPagerSettings.endIndex + 1,
            pageSize: currentPagerSettings.totalRecordsPerPage,
            sortedOn: currentPagerSettings.sortedOn,
            sortDirection: currentPagerSettings.sortDirection
        }

        return data
    }

    const getPagerSettings = (totalItems, currentPage = 1, totalRecordsPerPage = 10, totalPagerLinks = 10) => {
        const totalNumberOfPages = Math.ceil(totalItems / totalRecordsPerPage)

        let startPage = 0
        let endPage = 0

        if (currentPage < 1) {
            currentPage = 1
        } else if (currentPage > totalNumberOfPages) {
            currentPage = totalNumberOfPages
        }

        if (totalNumberOfPages <= totalPagerLinks) {
            startPage = 1
            endPage = totalNumberOfPages
        } else {
            const totalPagerLinksBeforeCurrentPage = Math.floor(totalPagerLinks / 2)
            const totalPagerLinksAfterCurrentPage = Math.ceil(totalPagerLinks / 2) - 1

            if (currentPage <= totalPagerLinksBeforeCurrentPage) {
                startPage = 1
                endPage = totalPagerLinks
            } else if (currentPage + totalPagerLinksAfterCurrentPage >= totalNumberOfPages) {
                startPage = totalNumberOfPages - totalPagerLinks + 1
                endPage = totalNumberOfPages
            } else {
                startPage = currentPage - totalPagerLinksBeforeCurrentPage
                endPage = currentPage + totalPagerLinksAfterCurrentPage
            }
        }

        const startIndex = (currentPage - 1) * totalRecordsPerPage
        const endIndex = Math.min(startIndex + totalRecordsPerPage - 1, totalItems - 1)

        const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => {
            return startPage + i
        })

        const currentPagerSettings = {
            totalItems,
            currentPage,
            totalRecordsPerPage,
            totalNumberOfPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            sortedOn,
            sortDirection,
            pages
        }

        return currentPagerSettings
    }

    const onAllowedActionsClick = () => {
        const data = {
            action: selectAllowedActionsRef.current.value,
            data: records.filter(x => x.checked)
        }

        onActionsClick(data)
    }

    const onHeadingSort = (heading) => {
        if (heading.sortable !== null && heading.sortable === false) {
            return
        }

        let currentSortedOn = heading.sortedOn ? heading.sortedOn : heading.id
        let currentSortDirection = heading.sortDirection === 'asc' ? 'desc' : 'asc'

        setSortedOn(currentSortedOn)
        setSortDirection(currentSortDirection)

        setColumns(columns.map((column) => column.id === heading.id
            ? { ...column, sortDirection: currentSortDirection }
            : { ...column, sortDirection: null }))

        const data = {
            startIndex: pagerSettings.startIndex,
            endIndex: pagerSettings.endIndex + 1,
            pageSize: pagerSettings.totalRecordsPerPage,
            sortedOn: currentSortedOn,
            sortDirection: currentSortDirection,
        }

        onSortClick(data)
    }

    const onRecordSelect = (event) => {
        setRecords(records.map((record) => record.id == event.item.id ? { ...record, checked: event.e.target.checked } : record))
    }

    const onRecordSelectAll = (event) => {
        setRecords(records.map((record) => record && { ...record, checked: event.target.checked }))
    }

    const onSetPage = (page) => {
        const currentPagerSettings = getPagerSettings(total, page, limit, pageSize)

        const data = getPagerData(currentPagerSettings)

        onPagerClick(data)

        setPagerSettings(currentPagerSettings)
    }

    const onSetLimitClick = (pagerLimit) => {
        const currentPagerSettings = getPagerSettings(total, page, +pagerLimit, pageSize)

        const data = getPagerData(currentPagerSettings)

        onPagerClick(data)

        setLimit(+pagerLimit)
        setPagerSettings(currentPagerSettings)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='listing'>
                        {
                            (isLoading === true) &&
                            <FaCircleNotch className='spinner' />
                        }

                        {
                            (isLoading === false && (!records || records && records.length === 0 || !columns || columns.length === 0)) &&
                            <>
                                {emptyMessage}
                            </>
                        }

                        {
                            (records && records.length > 0 && columns && columns.length > 0) &&
                            <div className='table-responsive'>
                                <table className='table table-striped table-hover table-sm mt-3'>
                                    <thead>
                                        <tr>
                                            {(
                                                columns.map((column) => (
                                                    <th key={column.id} style={getColumnStyle(column)} onClick={() => onHeadingSort(column)}>
                                                        <div className='list-column-sort'>{getHeaderDisplay(column)}</div>
                                                        {(
                                                            column.sortDirection === 'asc' &&
                                                            <FaArrowUp />
                                                        )}

                                                        {(
                                                            column.sortDirection === 'desc' &&
                                                            <FaArrowDown />
                                                        )}
                                                    </th>
                                                ))
                                            )}

                                            {(
                                                (allowedActions && allowedActions.length > 0) &&
                                                <th style={{ textAlign: 'center', width: '30px' }}>
                                                    <input name='selectedAllCheckbox' type='checkbox' onChange={(e) => onRecordSelectAll(e)} />
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(
                                            records.map((item) => (
                                                <tr key={item.id}>
                                                    {(
                                                        columns.map((column) => (
                                                            <td key={column.id} style={getColumnStyle(column)}>
                                                                <div>{item[column.id]}</div>
                                                            </td>
                                                        ))
                                                    )}

                                                    {(
                                                        (allowedActions && allowedActions.length > 0) &&
                                                        <td style={{ textAlign: 'center', width: '30px' }}>
                                                            <input type="checkbox" checked={item.checked} onChange={(e) => onRecordSelect({ e, item })} />
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        }

                        {
                            (records && records.length > 0 && columns && columns.length > 0 && pagerSettings && pagerSettings.pages && pagerSettings.pages.length > 0) &&
                            <div>
                                <div className='listing-pager' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 2 }}>
                                        <ul className='pagination pagination-sm'>
                                            <li className={`page-item first-item ${pagerSettings.currentPage === 1 ? 'disabled' : ''}`}>
                                                <a onClick={() => onSetPage(1)} className='page-link'>First</a>
                                            </li>
                                            <li className={`page-item previous-item ${pagerSettings.currentPage === 1 ? 'disabled' : ''}`}>
                                                <a onClick={() => onSetPage(pagerSettings.currentPage - 1)} className='page-link'>Previous</a>
                                            </li>

                                            {(
                                                pagerSettings.pages.map((page) => (
                                                    <li key={page} className={`page-item number-item ${pagerSettings.currentPage === page ? 'active' : ''}`}>
                                                        <a onClick={() => onSetPage(page)} className='page-link'>{page}</a>
                                                    </li>
                                                ))
                                            )}

                                            <li className={`page-item next-item ${pagerSettings.currentPage === pagerSettings.totalNumberOfPages ? 'disabled' : ''}`}>
                                                <a onClick={() => onSetPage(pagerSettings.currentPage + 1)} className='page-link'>Next</a>
                                            </li>
                                            <li className={`page-item last-item ${pagerSettings.currentPage === pagerSettings.totalNumberOfPages ? 'disabled' : ''}`}>
                                                <a onClick={() => onSetPage(pagerSettings.totalNumberOfPages)} className='page-link'>Last</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span className='text-muted small pager-label'>Page Size</span>
                                                    </td>
                                                    <td>
                                                        <select className='form-control form-control-sm ml-1' value={limit} onChange={(e) => onSetLimitClick(e.target.value)}>
                                                            <option value={10}>10</option>
                                                            <option value={20}>20</option>
                                                            <option value={50}>50</option>
                                                            <option value={100}>100</option>
                                                            <option value={total}>ALL</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {(
                                        (allowedActions && allowedActions.length > 0) &&
                                        <div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <span className='text-muted small pager-label ml-3 actions-label'>Actions</span>
                                                        </td>
                                                        <td>
                                                            <select ref={selectAllowedActionsRef} className='form-control form-control-sm ml-1' name='action'>
                                                                <option></option>
                                                                {(
                                                                    allowedActions.map((action) => (
                                                                        <option key={action} value={action}>{action}</option>
                                                                    ))
                                                                )}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-primary btn-sm ml-1" onClick={onAllowedActionsClick}>Submit</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Listing.defaultProps = {
    data: [],
    headings: [],
    totalNumberOfRecords: 0,
    actions: [],
    empty: <p>No matches found or query returned no data.</p>,
    loading: false,
    currentPagerPage: 1,
    numberOfRecordsPerPage: 10,
    maximumPagerLinks: 10
}

Listing.propTypes = {
    data: PropTypes.array,
    headings: PropTypes.array,
    totalNumberOfRecords: PropTypes.number,
    actions: PropTypes.array,
    empty: PropTypes.element,
    loading: PropTypes.bool,
    currentPagerPage: PropTypes.number,
    numberOfRecordsPerPage: PropTypes.number,
    maximumPagerLinks: PropTypes.number,
    onSortClick: PropTypes.func,
    onPagerClick: PropTypes.func,
    onActionsClick: PropTypes.func
}

export default Listing