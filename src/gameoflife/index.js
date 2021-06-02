import React, { useState, useEffect } from 'react'
import { config } from './config'
import { vh, vw, vmin, vmax, randomizeCells, getNextGen } from './helpers'
import { doublediagonal } from './patterns'

export default function Main(props) {

    const [canvas, setCanvas] = useState(null);
    const [eventId, setEventId] = useState(null);
//after component mounts
    useEffect(() => {
        //fetch device screen dimensions, and calculate how many cells are needed
        initializeCanvas();
    }, []);

    useEffect(() => {
        //startSimulation();
    }, [canvas ? canvas.rowCount : null])

    const initializeCanvas = () => {
        const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        const rowCount = Math.floor((windowHeight-config.extraSpace)/config.cellDimensions)
        const columnCount = Math.floor((windowWidth-100)/config.cellDimensions)
        console.log(windowHeight, rowCount, windowWidth, columnCount);
        //initialize Array
        //let arr = randomizeCells({rowCount, columnCount})
        //let arr = new Array(rowCount).fill(new Array(columnCount).fill(0))
        let arr = [];
        //vertical line
        //arr[1][1] = 1;

        //double diagonal
        arr = doublediagonal(rowCount, columnCount)

        if(eventId) {
            clearInterval(eventId)
        }
        setCanvas({
            ...config,
            rowCount,
            columnCount,
            dataArray: arr,
        })
    }

    const startSimulation = () => {
        if(canvas) {
            const newEventId = setInterval(() => nextGen(canvas.dataArray), config.epochDuration)
            setEventId(newEventId)
            //nextGen(arr)
        }
    }

    const stopSimulation = () => {
        if(eventId) {
            clearInterval(eventId);
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

    const { dataArray, cellDimensions, extraSpace, transitionSpeed } = canvas;

    return (
        <div className="main">
            <h1 className="">Game of life</h1>
            <button onClick={initializeCanvas}>randomize</button>
            <button onClick={startSimulation}>start</button>
            <button onClick={stopSimulation}>stop</button>
            {
                canvas &&
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
                                                    transition: `background-color ${transitionSpeed}s ease-in`,
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
