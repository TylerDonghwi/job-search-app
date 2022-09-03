import { SetStateAction, useState } from 'react';
import jobsList from '../data/jobs.json'
import Job from './Job';


export default function Jobs() {

    // sorting
    const [order, setOrder] = useState('default')

    const handleSelectChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setOrder(event.target.value)
    }

    const sortByName = (a: { name: string; }, b: { name: string; }) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
    const sortByDate = (a: { creationDate: string; }, b: { creationDate: string; }) => (a.creationDate < b.creationDate) ? 1 : ((b.creationDate < a.creationDate) ? -1 : 0)
    const sortDefault = (a: { id: number; }, b: { id: number; }) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)

    // filtering
    const [filterValue, setFilterValue] = useState("")
    const handleInputChange = (event: { currentTarget: { value: SetStateAction<string>; }; }) => {
        setFilterValue(event.currentTarget.value)
    }

    return (
        <>
            <div className='flex justify-around border shadow-md mx-8 my-4 p-4 rounded-lg'>
                <div>
                    <label>Sort by: </label>
                    <select onChange={handleSelectChange}>
                        <option value="default">Default</option>
                        <option value="name">Alphabetically</option>
                        <option value="date">Most Recent</option>
                    </select>
                </div>
                <div>
                    <label>Filter jobs: </label>
                    <input type="text" value={filterValue} onChange={handleInputChange} />
                </div>
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {jobsList.sort(order === "date" ? sortByDate : order === "name" ? sortByName : sortDefault)
                    .filter(job => job.name.toLowerCase().includes(filterValue.toLowerCase()))
                    .map(job => (
                        <div key={job.id}>
                            <Job {...job} />
                        </div>
                    ))}
            </div>
        </>

    )
}
