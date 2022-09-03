import jobsList from '../data/jobs.json'

export default function Jobs() {

    const sortByName = (a: { id: string; }, b: { id: string; }) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)
    const sortByDate = (a: { creationDate: string; }, b: { creationDate: string; }) => (a.creationDate > b.creationDate) ? 1 : ((b.creationDate > a.creationDate) ? -1 : 0)

    return (
        <div className="bg-blue-200">
            {jobsList.sort(sortByDate).map(job => (
                <div key={job.id}>
                    {job.id}: {job.creationDate}
                </div>
            ))}
        </div>
    )
}
