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
  handleClickCell = async (row, column) => {
    if (
      // No game id
      this.state.id === undefined ||
      // A winner exists
      this.state.winner ||
      // The space isn't blank
      this.state.board[row][column] !== ' '
    ) {
      return
    } else {
      // Generate the URL we need
      const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`
      // Make an object to send as JSON
      const body = { row: row, column: column }
      // Make a POST request to make a move
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.status === 200) {
        // Get the response as JSON
        const game = await response.json()
        // Make that the new state!
        this.setState(game)
      }
    }
  }

  handleNewGame = async () => {
    // Make a POST request to ask for a new game
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    if (response.status === 200) {
      // Get the response as JSON
      const game = await response.json()
      console.log(game)
      // Make that the new state!
      this.setState(game)
    }
  }

  render() {
    return (
      <div>
        <h1>
          Minesweeper
          <button onClick={this.handleNewGame}>New</button>
        </h1>
        <ul className="test">
          {this.state.board.map((boardRow, rowIndex) => {
            return boardRow.map((cell, columnIndex) => {
              return (
                <li
                  key={columnIndex}
                  onClick={() => this.handleClickCell(rowIndex, columnIndex)}
                >
                  {cell}
                </li>
              )
            })
          })}
        </ul>
      </div>
    )
  }
}
