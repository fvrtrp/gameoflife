export const doublediagonal = (rowCount, columnCount) => {
    let arr = [];
    for(let i=0; i<rowCount; i++) {
        const row = [];
        for(let j=0; j<columnCount; j++) {
            if(i===j || i=== j+1) {
                row.push(1);
            }
            else
                row.push(0);
        }
        arr.push(row);
    }
    return arr;
}