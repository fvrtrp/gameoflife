export function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}
  
export function vw(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}
  
export function vmin(v) {
    return Math.min(vh(v), vw(v));
}
  
export function vmax(v) {
    return Math.max(vh(v), vw(v));
}

export const randomizeCells = (rowCount, columnCount) => {
    const newData = [];
    for(let i=0; i< rowCount; i++) {
        const row = [];
        for(let j=0; j<columnCount; j++) {
            //actual random
            //const rand = Math.floor(Math.random()*2)

            //skewed to make more empty than full
            const vals = [0,0,0,0,0,0,0,1]
            const rand = vals[Math.floor(Math.random()*vals.length)]

            row.push(rand)
        }
        newData.push(row);
    }
    return newData;
}

export const getNextGen = (pixels) => {
    let newPixels = [], upperX = pixels[0].length, upperY = pixels.length

    const prev = (index, type) => {
        return index === 0 ? (type==='y' ? upperX : upperY) - 1 : index - 1
    }
    const next = (index, type) => {
        return index === (type==='y' ? upperX : upperY) - 1 ? 0 : index + 1
    }

    for(let i=0; i<upperY; i++) {
        newPixels[i] = [...pixels[i]]
        for(let j=0; j<upperX; j++) {
          let count=0;
        //   console.log(`zzz cell`, i, j, prev(i,'x'), prev(j,'y'));
          if(pixels[prev(i, 'x')][prev(j, 'y')]===1)    count++
          if(pixels[prev(i, 'x')][j]===1)count++
          if(pixels[prev(i, 'x')][next(j, 'y')]===1)count++
          if(pixels[i][prev(j, 'y')]===1)count++
          if(pixels[i][next(j, 'y')]===1)count++
          if(pixels[next(i, 'x')][prev(j, 'y')]===1)count++
          if(pixels[next(i, 'x')][j]===1)count++
          if(pixels[next(i, 'x')][next(j, 'y')]===1)count++

          newPixels[i][j] = (pixels[i][j] === 1) ? ((count<2 || count>3) ? 0 : 1) :(count===3 ? 1 : 0)

          count=0
        }
    }
    return newPixels
}

