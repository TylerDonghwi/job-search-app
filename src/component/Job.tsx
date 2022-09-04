import { useState } from 'react'
import { jobStatus } from './Jobs'
import useLocalStorage from '../hook/useLocalStorage'
import uuid from 'react-uuid';


type jobProps = {
    id: number,
    name: string,
    creationDate: string,
    client: string
    contact: string
}

type note = {
    id: number,
    note: string
}

export default function Job(prop: { job: jobProps, statusFilter: string }) {

    // job status
    const [status, setStatus] = useLocalStorage<string>(`status ${prop.job.id}`, jobStatus.SCHEDULED)

    // showing details
    const [visibility, setVisibility] = useState<boolean>(false)

    // notes in general
    const [inputValue, setInputValue] = useState<string>('')
    const [notes, setNotes] = useLocalStorage<note[]>(`notes${prop.job.id}`, [])

    // editing notes
    const [editingOn, setEditingOn] = useState<boolean>(false)
    const [noteEditing, setNoteEditing] = useState<number | undefined>()
    const [editingText, setEditingText] = useState('')

    const addNote = () => {
        if (inputValue === '') return
        setNotes([...notes, { id: uuid(), note: inputValue }])
        setInputValue('')
    }

    const setEditing = (note: note) => {
        setEditingOn(true)
        setNoteEditing(note.id)
        setEditingText(note.note)
    }

    const cancelEditing = () => {
        setEditingOn(false)
        setNoteEditing(undefined)
        setEditingText('')
    }

    const editNote = (id: number) => {
        const newNote: note[] = [...notes].map((note) => {
            if (id === note.id) {
                note.note = editingText
            }
            return note
        })
        setNotes(newNote)
        setNoteEditing(undefined)
        setEditingOn(false)
        setEditingText('')
    }

    const deleteNote = (id: number) => {
        setNotes([...notes].filter(note => note.id !== id))
        setEditingOn(false)
        setNoteEditing(undefined)
    }

    return (
        <div className={'m-2 pb-2 border border-orange-500 shadow-md rounded-md hover:bg-slate-50 transition-all duration-200 ' + (prop.statusFilter === status || prop.statusFilter === '' ? 'block' : 'hidden')}>
            <div className='m-2 text-lg font-bold'>
                {prop.job.name}
            </div>
            <div className='m-2'>
                created on: {prop.job.creationDate}<br />
                Status: {status}
            </div>
            <button
                className='relative text-white rounded-sm p-1 mx-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                onClick={() => {
                    setVisibility(!visibility)
                    cancelEditing()
                    setInputValue('')
                }}
            >{visibility ? 'Hide Details' : 'Show Details'}</button>

            <div className={visibility ? 'block' : 'hidden'}>
                <div className='m-2'>
                    <div className='text-gray-700'>
                        posted by {prop.job.client}<br />
                        contact: {prop.job.contact}<br />
                        <label>Change Status:</label>
                        <select
                            onChange={(e) => e.target.value !== '' ? setStatus(e.target.value) : null}
                            className='outline-none border rounded ml-1'
                        >
                            <option value=''></option>
                            <option value={jobStatus.SCHEDULED}>scheduled</option>
                            <option value={jobStatus.ACTIVE}>active</option>
                            <option value={jobStatus.INVOICING}>invoicing</option>
                            <option value={jobStatus.TO_PRICED}>to priced</option>
                            <option value={jobStatus.COMPLETED}>completed</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <span className='font-bold'>Notes:</span>
                        {notes.map((note: { id: number; note: string }) => (
                            <div key={note.id} className='flex flex-row justify-between items-center'>
                                <div>&bull;
                                    {noteEditing === note.id ?
                                        (<input
                                            className='ml-1 outline-none border rounded'
                                            type="text"
                                            value={editingText}
                                            onChange={e => setEditingText(e.target.value)}
                                            onKeyDown={e => e.key === "Enter" ? editNote(note.id) : null}
                                        />)
                                        :
                                        (<span
                                            className='ml-1'
                                        >{note.note}</span>)
                                    }
                                </div>
                                <div>
                                    <button
                                        className={'relative text-white rounded-sm h-[32px]w-[80px] m-1 p-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 ' + (editingOn && noteEditing === note.id ? 'inline' : 'hidden')}
                                        onClick={cancelEditing}
                                    >Cancel</button>
                                    <button
                                        className={'relative text-white rounded-sm h-[32px]w-[80px] m-1 p-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 ' + (editingOn ? 'hidden' : 'inline')}
                                        onClick={() => setEditing(note)}
                                    >Edit</button>
                                    <button
                                        className={'relative text-white rounded-sm h-[32px]w-[80px] m-1 p-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 ' + (editingOn && noteEditing === note.id ? 'inline' : 'hidden')}
                                        onClick={() => editNote(note.id)}
                                    >Submit</button>
                                    <button
                                        className={'relative text-white rounded-sm h-[32px]w-[80px] m-1 p-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 ' + (editingOn && noteEditing === note.id ? 'hidden' : 'inline')}
                                        onClick={() => deleteNote(note.id)}
                                    >Delete</button>
                                </div>
                            </div>
                        ))
                        }
                    </div >
                    <div className='flex flex-row justify-between items-center'>
                        <input
                            type="text"
                            className='outline-none border rounded pl-1 h-[32px] flex-grow'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => e.key === "Enter" ? addNote() : null}
                        />
                        <button
                            className='relative text-white rounded-sm h-[32px] w-[80px] m-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                            onClick={addNote}
                        >
                            Add Note
                        </button>
                    </div>
                </div >
            </div>
        </div >
    )
}
