import { useState } from "react"

type jobProps = {
    id: string,
    creationDate: string,
    client: string
    contact: string
}

export default function Job({ id, creationDate, client, contact }: jobProps) {

    enum jobStatus {
        SCHEDULED = 'scheduled',
        ACTIVE = 'active',
        INVOICING = 'invoicing',
        TO_PRICED = 'to priced',
        COMPLETED = 'completed',
    }

    const [status, setStatus] = useState<jobStatus>(jobStatus.SCHEDULED)

    return (
        <div className="m-2 border border-orange-500 shadow-md rounded-md">
            <div className="m-2 text-lg font-bold">
                {id}
            </div>
            <div className="m-2">
                <div className="text-gray-700">
                    created on: {creationDate}
                </div>
                <div className="text-sm text-gray-500">
                    posted by {client} &#xb7; contact: {contact}
                </div>
                <div>Status: {status}</div>
                <button
                    className='relative text-white rounded-sm p-1 m-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                    onClick={() => console.log(`viewing notes for ${id}`)}
                >Details</button>
                <button
                    className='relative text-white rounded-sm p-1 m-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                    onClick={() => console.log(`adding note for ${id}`)}
                >Add Note</button>
            </div>

        </div >
    )
}
