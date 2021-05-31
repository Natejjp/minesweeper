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

  render() {
    const grid = this.state.board.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        return <li key={colIndex}>{cell}</li>
      })
    })

    return (
      <main>
        <h1>Minesweeper</h1>
        <button onClick={this.handleNewGame}>New Easy Game</button>
        <ul>{grid}</ul>
      </main>
    )
  }
}
