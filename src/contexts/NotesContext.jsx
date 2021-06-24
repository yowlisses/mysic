import React, { createContext, useContext, useState } from 'react'
import notasExemplo from '../utils/notasExemplo'

import { pixelToXPosition, pixelToYPosition } from '../components/NotesEditor'

const html = document.querySelector('html');

export const NotesContext = createContext('')

export function NotesContextProvider(props) {
    const [notes, setNotes] = useState([...notasExemplo])
    const [selectedList, setSelectedList] = useState(
        [7, 8, 9, 10, 11, 12].map(i => notes[i])
    )

    let moving = []
    let scaling = []

    const addToMoving = (note, setStart, setHeight) => {
        moving.push({ note, setStart, setHeight })
    }

    const addToScaling = (note, initialDuration, setDuration) => {
        scaling.push({ note, initialDuration, setDuration })
    }

    const startMove = () => {
        html.onmousemove = (e) => {
            for (let coisa of moving) {
                coisa.note.start = pixelToXPosition(e.screenX)
                //DANGEROUS: hard coded
                coisa.note.height = pixelToYPosition(e.screenY)
                coisa.setStart(coisa.note.start)
                coisa.setHeight(coisa.note.height)
            }
        }
    }

    const startScale = (e) => {
        const initialMousePosition = pixelToXPosition(e.screenX)
        html.onmousemove = (e) => {
            for (let coisa of scaling) {
                coisa.note.duration = pixelToXPosition(e.screenX) - initialMousePosition + coisa.initialDuration
                coisa.setDuration(coisa.note.duration)
            }
            e.preventDefault()
        }
    }

    const endMove = () => {
        html.onmousemove = () => {
        }
    }

    //DANGER: hard coded
    const hardCodedDuration = 4

    const addNote = (start, height) => {
        const newNote = { start, height, duration: hardCodedDuration }
        setNotes(notes.concat(newNote))
        return newNote
    }

    const removeNote = (note) => {
        const index = notes.indexOf(note)
        notes[index] = null
        setNotes([...notes])
    }

    html.onmouseup = () => {
        endMove()
        moving = []
        scaling = []
    }

    html.onmousedown = (e) => {
    }

    return (
        < NotesContext.Provider value={{
            notes,
            selectedList,
            setSelectedList,
            startMove,
            endMove,
            addToMoving,
            startScale,
            addToScaling,
            addNote,
            removeNote,
        }}>
            {props.children}
        </ NotesContext.Provider>
    )
}

export const useNotes = () => {
    return useContext(NotesContext)
}