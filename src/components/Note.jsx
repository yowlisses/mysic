import "./Note.css"

import React, { useEffect, useState } from 'react'

import { useNotes } from '../contexts/NotesContext'

export default function Note(props) {
    const { id } = props
    const [note] = useState(props.note)
    const { startMove, addToMoving } = useNotes()
    const { startScale, addToScaling } = useNotes()

    const [start, setStart] = useState(props.note.start)
    const [height, setHeight] = useState(props.note.height)
    const [duration, setDuration] = useState(props.note.duration)

    return (
        <div
            className='note'
            style={{ '--start': start, '--height': height, '--duration': duration }}
            id={id}
            onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); addToMoving(note, setStart, setHeight); startMove(); }}
        >{start}
            <div className="duration-handle"
                onMouseDown={(e) => { e.stopPropagation(); addToScaling(note, duration, setDuration); startScale(e); }}>
            </div>
        </div >
    )
}