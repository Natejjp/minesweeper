import React, { Component } from 'react'

export class App extends Component {
  state = {
    board: [
      ['3', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
  }

  render() {
    const grid = this.state.board.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        return <li key={colIndex}>{cell}</li>
      })
    })

    return (
      <div>
        <h1>Minesweeper</h1>
        <ul>{grid}</ul>
      </div>
    )
  }
}
