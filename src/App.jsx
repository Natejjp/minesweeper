import React, { Component } from 'react'

export class App extends Component {
  state = {
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
  }

  handleNewGame = async () => {
    const body = { difficulty: 0 }

    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )

    const game = await response.json()
    this.setState(game)
  }

  handleClickCell = async (rowIndex, colIndex) => {
    const body = { row: rowIndex, col: colIndex }

    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()
    this.setState(game)
  }

  handleRightClickCell = async (event, rowIndex, colIndex) => {
    event.preventDefault()

    const body = { row: rowIndex, col: colIndex }

    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()
    this.setState(game)
  }

  replaceBackground = cell => {
    switch (cell) {
      case 'F':
        return 'cell-flag'
      case '*':
        return 'cell-bomb'
      case '_':
        return 'cell-free'
      default:
        return 'cell-number'
    }
  }

  replaceElements = cell => {
    switch (cell) {
      case 'F':
        return '🚩'
      case '*':
        return '💣'
      case '_':
        return '_'
      default:
        return cell
    }
  }
  render() {
    return (
      <main>
        <h1>Minesweeper</h1>
        <button onClick={this.handleNewGame}>New Easy Game</button>
        <h2>Game: {this.state.id}</h2>
        <h3>{this.state.state}</h3>
        <ul>
          {this.state.board.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
              return (
                <li
                  key={colIndex}
                  onClick={() => this.handleClickCell(rowIndex, colIndex)}
                  onContextMenu={() =>
                    this.handleRightClickCell(event, rowIndex, colIndex)
                  }
                  className={this.replaceBackground(cell)}
                >
                  {this.replaceElements(cell)}
                </li>
              )
            })
          })}
        </ul>
      </main>
    )
  }
}
