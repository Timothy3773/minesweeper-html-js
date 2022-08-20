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
    data.push([])
    board.append(row)
    return new Promise(
        (resolve, reject) => {
            if (row) {
                resolve({el: row, ind: data.length})
            }else{
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
    cellBtn.innerText = int
    cell.append(cellBtn)
    row.append(cell)
}

window.addEventListener("load", (ev) => {
    console.log("Loaded", data)
    for (let rows = 0; rows < settings.rows; rows++){
        createRow().then((v) => {
            for (let cells = 0; cells < settings.cellsPerRow; cells++){
                createCell(v.el, `${rows}/${cells}`)
            }
        })
    }
})