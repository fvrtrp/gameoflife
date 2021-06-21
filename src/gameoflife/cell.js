import React, { useEffect, useMemo } from 'react'
import AlienIcon from './alien.svg'
import PumpkinIcon from './pumpkin.svg'
import CellIcon from './cell.svg'

function Cell(props) {
    useEffect(() => {
        //console.log(`zzz render cell`)
    })
    
    const { cell, cellDimensions, transitionSpeed } = props
    //const cellValue = useMemo((cell) => (cell), [cell])

    if(!cell) {
        return (
            <div
                className={`cell inactive`}
                style={{
                    width: `${cellDimensions}px`,
                    height: `${cellDimensions}px`,
                    // transition: `opacity ${transitionSpeed}s ease-in-out`,
                }}
            ></div>
        )
    }

    return (
        <div
            className={`cell active`}
            style={{
                width: `${cellDimensions}px`,
                height: `${cellDimensions}px`,
                transition: `opacity ${transitionSpeed}s ease-in-out`,
            }}
        >
            {
            // custom icons
            <img src={PumpkinIcon}
                className="customCell"
                alt="cell"
            />
            }
        </div>
    )
}

export default React.memo(Cell)