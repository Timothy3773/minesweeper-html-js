let game = document.getElementById('game')
let board = document.getElementById('board')

let data = []
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
                resolve(row)
            }else{
                reject("no row?")
            }
        }
    )
}

var createCell = (row) => {
    let cell = document.createElement("td")
    cell.id = "cell"
    let cellBtn = document.createElement("button")
    cellBtn.id = "cellBtn"
    cell.append(cellBtn)
    row.append(cell)
}

window.addEventListener("load", (ev) => {
    console.log("Loaded", data)
    for (let rows = 0; rows < settings.rows; rows++){
        createRow().then((v) => {
            for (let cells = 0; cells < settings.cellsPerRow; cells++){
                createCell(v)
            }
        })
    }
})