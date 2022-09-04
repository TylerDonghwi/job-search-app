import { useState } from 'react'
import { jobStatus } from './Jobs'

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

export default function Job({ name, creationDate, client, contact }: jobProps) {

    const [status, setStatus] = useState<string>(jobStatus.SCHEDULED)
    const [visibility, setVisibility] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [notes, setNotes] = useState<note[]>([])

    const [noteCounter, setNoteCounter] = useState<number>(0)
    const [editingOn, setEditingOn] = useState<boolean>(false)
    const [noteEditing, setNoteEditing] = useState<number | undefined>()
    const [editingText, setEditingText] = useState('')

    const addNote = () => {
        if (inputValue === '') return
        setNoteCounter(noteCounter + 1)
        setNotes([...notes, { id: noteCounter, note: inputValue }])
        setInputValue('')
    }

    const setEditing = (note: note) => {
        setEditingOn(true)
        setNoteEditing(note.id)
        setEditingText(note.note)
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
        <div className='m-2 border border-orange-500 shadow-md rounded-md'>
            <div className='m-2 text-lg font-bold'>
                {name}
            </div>
            <div className='m-2'>
                <div className='text-gray-700'>
                    created on: {creationDate}
                </div>
                <div className='text-sm text-gray-500'>
                    posted by {client} &#xb7; contact: {contact}
                </div>
                <div>
                    <div>Status: {status}</div>
                    <label>Change Status:</label>
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
                    className='relative text-white rounded-sm p-1 my-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                    onClick={() => { setVisibility(!visibility) }}
                >{visibility ? 'Hide Details' : 'Show Details'}</button>

                <div className={'' + (visibility ? 'block' : 'hidden')}>
                    <div>
                        {notes.map(note => (
                            <div key={note.id} className='flex flex-row justify-between items-center'>
                                <div>&bull;
                                    {noteEditing === note.id ?
                                        (<input
                                            className='ml-1 outline-none border rounded'
                                            type="text"
                                            value={editingText}
                                            onChange={e => setEditingText(e.target.value)}
                                        />)
                                        :
                                        (<span
                                            className='ml-1'
                                        >{note.note}</span>)
                                    }
                                </div>
                                <div>
                                    <button
                                        className={'relative text-white rounded-sm h-[32px]w-[80px] m-1 p-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 ' + (editingOn ? 'hidden' : 'inline')}
                                        onClick={() => setEditing(note)}
                                    >Edit</button>
                                    <button
                                        className={'relative text-white rounded-sm h-[32px]w-[80px] m-1 p-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 ' + (editingOn && noteEditing === note.id ? 'inline' : 'hidden')}
                                        onClick={() => editNote(note.id)}
                                    >Submit</button>
                                    <button
                                        className='relative text-white rounded-sm h-[32px]w-[80px] m-1 p-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                                        onClick={() => deleteNote(note.id)}
                                    >Delete</button>
                                </div>

                            </div>
                        ))}
                    </div>

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

                </div>

            </div>

        </div >
    )
}
