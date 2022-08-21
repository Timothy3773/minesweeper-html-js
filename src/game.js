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
    return cell
}

var getCell = (x, y) => {
    let cell = data.find(cell => cell.x == x && cell.y == y)
    if (cell !== undefined) {
        return cell
    } else {
        throw Error("Cell not found")
    }
}

var validateAdjacentCells = (x,y) => {
    return getCell(x - 1, y - 1)
}


window.addEventListener("load", async (ev) => {
    await (async () => {
        for (let rows = 0; rows < settings.rows; rows++) {
            createRow().then((v) => {
                for (let cells = 0; cells < settings.cellsPerRow; cells++) {
                    let cell = createCell(v.el, `${cells}`)
                    data.push({ element: cell, x: cells, y: rows })
                }
            })
        }
    })()

    console.log(getCell(1, 7))
    console.log(validateAdjacentCells(2,2))
})