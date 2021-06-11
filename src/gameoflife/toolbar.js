import React from 'react'

export default function Toolbar(props) {
    const { 
        transitionSpeed,
        cellDimensions,
        epochDuration,
        updateCanvas
    } = props

    return (
        <div className="toolbar">
            <div className="slidecontainer">
                <input
                    type="range"
                    min={0}
                    max={10}
                    value={transitionSpeed}
                    className="slider"
                    id="myRange"
                    onChange={(e)=>updateCanvas('transitionSpeed', e.target.value)}
                />
            </div>
            <div className="slidecontainer">
                <input
                    type="range"
                    min={50}
                    max={5000}
                    step="25"
                    value={epochDuration}
                    className="slider"
                    id="myRange"
                    onChange={(e)=>updateCanvas('speed', e.target.value)}
                />
            </div>
            <div className="slidecontainer">
                <input
                    type="range"
                    min={5}
                    max={100}
                    step="5"
                    value={cellDimensions}
                    className="slider"
                    id="myRange"
                    onChange={(e)=>updateCanvas('size', e.target.value)}
                />
            </div>
        </div>
    )
}