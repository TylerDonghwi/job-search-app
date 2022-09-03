import { useState } from 'react';
import jobsList from '../data/jobs.json'
import Job from './Job';

export enum jobStatus {
    SCHEDULED = 'Scheduled',
    ACTIVE = 'Active',
    INVOICING = 'Invoicing',
    TO_PRICED = 'To Priced',
    COMPLETED = 'Completed',
}

export default function Jobs() {

    // sorting
    const [order, setOrder] = useState('default')
    const [statusFilter, setStatusFilter] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const sortByName = (a: { name: string; }, b: { name: string; }) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
    const sortByDate = (a: { creationDate: string; }, b: { creationDate: string; }) => (a.creationDate < b.creationDate) ? 1 : ((b.creationDate < a.creationDate) ? -1 : 0)
    const sortDefault = (a: { id: number; }, b: { id: number; }) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)

    return (
        <div>
            <div className='flex justify-between flex-col md:flex-row border shadow-md mx-4 lg:mx-8 my-4 p-4 rounded-lg'>
                <div className='m-1'>
                    <label>Sort by: </label>
                    <select
                        onChange={e => setOrder(e.target.value)}
                        className='outline-none border rounded'
                    >
                        <option value="default">Default</option>
                        <option value="name">Alphabetically</option>
                        <option value="date">Most Recent</option>
                    </select>
                </div>
                <div className='m-1'>
                    <label>Filter by job-status: </label>
                    <select
                        onChange={e => setStatusFilter(e.target.value)}
                        className='outline-none border rounded'
                        defaultValue=''
                    >
                        <option value=''>none</option>
                        <option value={jobStatus.SCHEDULED}>scheduled</option>
                        <option value={jobStatus.ACTIVE}>active</option>
                        <option value={jobStatus.INVOICING}>invoicing</option>
                        <option value={jobStatus.TO_PRICED}>to priced</option>
                        <option value={jobStatus.COMPLETED}>completed</option>
                    </select>
                </div>
                <div className='m-1'>
                    <label>Search jobs: </label>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        className='outline-none border rounded pl-1'
                        placeholder=''
                    />
                </div>
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {jobsList.sort(order === "date" ? sortByDate : order === "name" ? sortByName : sortDefault)
                    .filter(job => job.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .map(job => (
                        <div key={job.id}>
                            <Job {...job} />
                        </div>
                    ))}
            </div>
        </div>

    )
}
