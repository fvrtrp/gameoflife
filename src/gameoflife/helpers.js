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

export const randomizeCells = (props) => {
    const { rowCount, columnCount } = props;
    const newData = [];
    for(let i=0; i< rowCount; i++) {
        const row = [];
        for(let j=0; j<columnCount; j++) {
            row.push(Math.floor(Math.random()*2));
        }
        newData.push(row);
    }
    return newData;
}

export const getNextGen = (pixels) => {
    let newPixels = pixels, upperX = pixels[0].length, upperY = pixels.length;

    const prev = (index, type) => {
        return index === 0 ? (type==='y' ? upperX : upperY) - 1 : index - 1;
    }
    const next = (index, type) => {
        return index === (type==='y' ? upperX : upperY) - 1 ? 0 : index + 1;
    }

    for(let i=0; i<upperY; i++) {
        for(let j=0; j<upperX; j++) {
          let count=0;
        //   console.log(`zzz cell`, i, j, prev(i,'x'), prev(j,'y'));
          if(pixels[prev(i, 'x')][prev(j, 'y')]===1)    count++;
          if(pixels[prev(i, 'x')][j]===1)count++;
          if(pixels[prev(i, 'x')][next(j, 'y')]===1)count++;
          if(pixels[i][prev(j, 'y')]===1)count++;
          if(pixels[i][next(j, 'y')]===1)count++;
          if(pixels[next(i, 'x')][prev(j, 'y')]===1)count++;
          if(pixels[next(i, 'x')][j]===1)count++;
          if(pixels[next(i, 'x')][next(j, 'y')]===1)count++;

          if(pixels[i][j]===1) {
              if(count<2 || count>3)
                newPixels[i][j]=0;
          }
          else if(pixels[i][j]===0) {
            if(count===3)
              newPixels[i][j]=1;
          }
          count=0;
        }
    }
    return newPixels;
}

