/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { config } from './config'
import { vh, vw, vmin, vmax, randomizeCells, getNextGen } from './helpers'
import { doublediagonal } from './patterns'
import Toolbar from './toolbar'

export default function Main(props) {

    const [canvas, setCanvas] = useState(config);
    const [eventId, setEventId] = useState(null);
//after component mounts
    useEffect(() => {
        //fetch device screen dimensions, and calculate how many cells are needed
        initializeCanvas()
    }, []);

//after updating simulation properties
    useEffect(() => {
        if(canvas.shouldRedraw) {
            initializeCanvas()
        }
        else {
            startSimulation()
        }
    }, [
        canvas.transitionSpeed,
        canvas.epochDuration,
        canvas.shouldRedraw,
        canvas.cellDimensions
    ])

    const initializeCanvas = () => {
        const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        const rowCount = Math.floor((windowHeight-config.extraSpace)/canvas.cellDimensions)
        const columnCount = Math.floor((windowWidth-1000)/canvas.cellDimensions)
        console.log(`zzz`, canvas.cellDimensions, windowHeight, rowCount, windowWidth, columnCount);
        //initialize Array
        //let arr = randomizeCells({rowCount, columnCount})
        //let arr = new Array(rowCount).fill(new Array(columnCount).fill(0))
        let arr = [];

        //random pattern
        arr = randomizeCells(rowCount, columnCount)

        //vertical line
        //arr[1][1] = 1;

        //double diagonal
        //arr = doublediagonal(rowCount, columnCount)

        if(eventId) {
            clearInterval(eventId)
        }
        setCanvas({
            ...canvas,
            rowCount,
            columnCount,
            dataArray: arr,
        })
    }

    const startSimulation = () => {
        if(canvas && canvas.dataArray) {
            const newEventId = setInterval(() => nextGen(canvas.dataArray), canvas.epochDuration)
            setEventId(newEventId)
            //nextGen(arr)
        }
    }

    const stopSimulation = () => {
        if(eventId) {
            clearInterval(eventId)
            setEventId(null)
        }
    }

    const nextGen = (arr) => {
        const newArray = getNextGen(arr)
        setCanvas({...canvas, dataArray: newArray})
    }

    if(!canvas) {
        return (
            <div className="">Loading</div>
        )
    }

    const updateCanvas = (type, value) => {
        stopSimulation()
        switch(type) {
            case 'speed': {
                setCanvas({ ...canvas, shouldRedraw: false, epochDuration: parseInt(value) })
                break
            }
            case 'transitionSpeed': {
                setCanvas({ ...canvas, shouldRedraw: false, transitionSpeed: parseInt(value) })
                break
            }
            case 'size': {
                setCanvas({ ...canvas, shouldRedraw: true, cellDimensions: parseInt(value) })
            }
            default: break
        }
        //startSimulation()
    }

    const randomizePattern = () => {
        stopSimulation()
        setCanvas({ ...canvas, shouldRedraw: true })
    }

    // console.log(`zzz `, canvas)

    const { dataArray, cellDimensions, extraSpace, transitionSpeed } = canvas;

    return (
        <div className="main">
            <h1 className="">Game of life</h1>
            <Toolbar {...canvas} updateCanvas={updateCanvas} />
            <button onClick={randomizePattern}>randomize</button>
            {
                !eventId &&
                <button onClick={startSimulation}>start</button>
            }
            {
                eventId &&
                <button onClick={stopSimulation}>stop</button>
            }
            {
                dataArray &&
                <div className="canvas" style={{ width: `calc(100% - ${extraSpace}px`}}>
                {
                    dataArray.map((row, key) => {
                        return (
                            <div className="row" key={key}>
                                {
                                    row.map((cell, key2) => {
                                        return (
                                            <div
                                                key={key2}
                                                className={`cell ${key} ${key2} ${cell ? 'active' : ''}`}
                                                style={{
                                                    width: `${cellDimensions}px`,
                                                    height: `${cellDimensions}px`,
                                                    transition: `opacity ${transitionSpeed}s ease-in-out`,
                                                }}
                                            >
                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                </div>
            }
        </div>
    );
}
