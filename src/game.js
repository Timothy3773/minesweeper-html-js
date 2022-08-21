let game = document.getElementById('game')
let board = document.getElementById('board')

var data = []
let settings = {
    rows: 8,
    cellsPerRow: 8,
    mineDensity: 5
}

var createRow = () => {
    let row = document.createElement("tr")
    row.id = "row"
    board.append(row)
    return new Promise(
        (resolve, reject) => {
            if (row) {
                resolve({ el: row, ind: data.length })
            } else {
                reject("no row?")
            }
        }
    )
}

var createCell = (row, int) => {
    let cell = document.createElement("td")
    cell.id = "cell"
    let cellBtn = document.createElement("button")
    cellBtn.id = "cellBtn"
    cellBtn.classList.add("cellBtn")
    cellBtn.innerText = int
    cell.append(cellBtn)
    row.append(cell)
    return cellBtn
}

var getCell = (x, y) => {
    let cell = data.find(cell => cell.x == x && cell.y == y)
    if (cell !== undefined) {
        return cell
    } else {
        return null
    }
}

var validateAdjacentCells = (x, y) => {
    let adjacentCells = []
    let calculations = [
        {x: x, y: y - 1},
        {x: x + 1, y: y - 1},
        {x: x - 1, y: y - 1},
        {x: x - 1, y: y},
        {x: x + 1, y: y},
        {x: x, y: y + 1},
        {x: x + 1, y: y + 1},
        {x: x - 1, y: y - 1}
    ]
    for (const calc of calculations){
        let cell = getCell(calc.x, calc.y)
        if (cell !== null) adjacentCells.push(cell)
    }
    return adjacentCells
}

var updateCell = (cell,properties) => {
    if (cell && cell.element){
        /**
         * @type {HTMLTableCellElement} 
         */
        var el = cell.element
        el[properties.name] = properties.value
        return cell
    }
}

var cellTypeAlgor = (x,y) => {
    let cell = getCell(x,y)
    let neighbours = validateAdjacentCells(cell)
    return "bomb"
}


window.addEventListener("load", async (ev) => {
    await (async () => {
        for (let rows = 0; rows < settings.rows; rows++) {
            createRow().then((v) => {
                for (let cells = 0; cells < settings.cellsPerRow; cells++) {
                    let cell = createCell(v.el, `${cells}`)
                    data.push({ element: cell, x: cells, y: rows, cellType: cellTypeAlgor(cells, rows) })
                }
            })
        }
    })()

    console.log(getCell(0, 0))
    updateCell(getCell(0,0), {name: "innerText", value: "2"})
})