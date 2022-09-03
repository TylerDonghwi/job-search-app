import jobsList from '../data/jobs.json'
import Job from './Job';

export default function Jobs() {

    // sorting
    const sortByName = (a: { id: string; }, b: { id: string; }) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)
    const sortByDate = (a: { creationDate: string; }, b: { creationDate: string; }) => (a.creationDate > b.creationDate) ? 1 : ((b.creationDate > a.creationDate) ? -1 : 0)

    // filtering

    return (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobsList.sort(sortByDate).map(job => (
                <div key={job.id}>
                    <Job {...job} />
                </div>
            ))}
        </div>
    )
}
