# Odin-Tic-Tac-Toe

A web‑based Tic Tac Toe game built as part of The Odin Project curriculum. Players can compete against the computer (singleplayer) or against a friend (multiplayer), with a clean and responsive UI.

---

## 📖 Description

This project implements the classic Tic Tac Toe game using HTML, CSS and JavaScript. It offers two modes:

- **Singleplayer**: You against a computer (computers'moves are generated randomly).
- **Multiplayer**: Two human players, each entering their name.

The game board and display are rendered dynamically in JavaScript, keeping HTML markup minimal.

---

## ✨ Features

- **Modular Architecture**
  - `GameBoard` module manages game state.
  - `displayController` handles rendering the board and status messages.
  - `GameController` orchestrates game flow, turn switching, win/tie detection, and mode logic (singleplayer and multiplayer).
- **Win/Tie Detection**
  - Checks all rows, columns, and diagonals for three-in-a-row.
- **Responsive UI**
  - Responsive layout using Flexbox and adaptive units (*em* and *vh*)

---

## 🚀 Live Demo

> [https://eldangold.github.io/Odin-Tic-Tac-Toe/](https://eldangold.github.io/Odin-Tic-Tac-Toe/)

---

## 🎮 Usage

1. **Start Singleplayer**
   - Click the **Start Singleplayer** button to play against the computer.
2. **Start Multiplayer**
   - Click **Start Multiplayer**, enter both players’ names (not required), and begin a 2‑player game.
3. **Make a Move**
   - Click any empty cell to place your mark (your mark is "0").
   - The status bar will indicate the current turn (in multiplayer mode).
4. **Restart Game**
   - Click **Start/Restart** at any time to clear the board and start a new round in preferred mode.