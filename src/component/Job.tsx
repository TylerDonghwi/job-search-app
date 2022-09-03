import { useState } from "react"
import { jobStatus } from './Jobs'

type jobProps = {
    id: number,
    name: string,
    creationDate: string,
    client: string
    contact: string
}

export default function Job({ name, creationDate, client, contact }: jobProps) {



    const [status, setStatus] = useState<string>(jobStatus.SCHEDULED)

    return (
        <div className="m-2 border border-orange-500 shadow-md rounded-md">
            <div className="m-2 text-lg font-bold">
                {name}
            </div>
            <div className="m-2">
                <div className="text-gray-700">
                    created on: {creationDate}
                </div>
                <div className="text-sm text-gray-500">
                    posted by {client} &#xb7; contact: {contact}
                </div>
                <div>
                    <div>Status: {status}</div>
                    <label>Change Schedule:</label>
                    <select
                        onChange={(e) => setStatus(e.target.value)}
                        className='outline-none'
                    >
                        <option value={jobStatus.SCHEDULED}>scheduled</option>
                        <option value={jobStatus.ACTIVE}>active</option>
                        <option value={jobStatus.INVOICING}>invoicing</option>
                        <option value={jobStatus.TO_PRICED}>to priced</option>
                        <option value={jobStatus.COMPLETED}>completed</option>
                    </select>

                </div>

                <button
                    className='relative text-white rounded-sm p-1 m-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                    onClick={() => console.log(`viewing notes for ${name}`)}
                >Details</button>
                <button
                    className='relative text-white rounded-sm p-1 m-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                    onClick={() => console.log(`adding note for ${name}`)}
                >Add Note</button>
            </div>

        </div >
    )
}
