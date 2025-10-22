// // @ts-nocheck
// const BASE = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// function splitArr(arr) {
//   const len = arr.length;
//   const third = Math.floor(len / 3);
//   const firstPart = arr.slice(0, third);
//   const secondPart = arr.slice(third, 2 * third);
//   const thirdPart = arr.slice(2 * third);

//   return [firstPart, secondPart, thirdPart];
// }

// function rotateArr(arr, steps = 1) {
//   // Определяем направление и количество шагов
//   const direction = steps > 0 ? 'right' : 'left';
//   const count = Math.abs(steps) % arr.length;
  
//   if (direction === 'right') {
//     // Перестановка вправо (последний элемент становится первым)
//     for (let i = 0; i < count; i++) {
//       arr.unshift(arr.pop());
//     }
//   } else {
//     // Перестановка влево (первый элемент становится последним)
//     for (let i = 0; i < count; i++) {
//       arr.push(arr.shift());
//     }
//   }
  
//   return arr;
// }

// function mixRow() {
//     BASE.sort(() => Math.random() - 0.5);
//     return BASE;
// }

// export function getChain() {
//   let chain = [];
//   let bloks = splitArr(mixRow());

//   for (let j = 0; j < 3; j++) {
//     //First rows of sectors
//     rotateArr(bloks);
//     for (let i = 0; i < bloks.length; i++) {
//       chain.push(...(bloks[i]))
//     }
//     //2nd and 3rd rows of sectors
//     for (let ii = 0; ii < 2; ii++) {
//       rotateArr(bloks);
//       for (let i = 0; i < bloks.length; i++) {
//         chain.push(...rotateArr(bloks[i]))
//       }
//     }
//   }
//   return chain;
// }

class SudokuGenerator {
    constructor() {
        this.grid = Array(9).fill().map(() => Array(9).fill(0));
        this.solution = null;
    }

    // Основная функция для генерации судоку
    generate(difficulty = 'expert') {
        // Сначала создаем полное решение
        this._fillDiagonalBoxes();
        this._solveSudoku();
        this.solution = this.grid.map(row => [...row]);
        
        // Затем удаляем некоторые числа для создания головоломки
        const puzzle = this._createPuzzle(difficulty);
        return {
            puzzle: puzzle,
            solution: this.solution
        };
    }

    // Заполняем диагональные 3x3 блоки (они независимы)
    _fillDiagonalBoxes() {
        for (let i = 0; i < 9; i += 3) {
            this._fillBox(i, i);
        }
    }

    // Заполняем один 3x3 блок случайными числами
    _fillBox(row, col) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this._shuffleArray(numbers);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.grid[row + i][col + j] = numbers.pop();
            }
        }
    }

    // Проверяем, можно ли разместить число в ячейке
    _isSafe(row, col, num) {
        // Проверяем строку
        for (let x = 0; x < 9; x++) {
            if (this.grid[row][x] === num) return false;
        }

        // Проверяем столбец
        for (let x = 0; x < 9; x++) {
            if (this.grid[x][col] === num) return false;
        }

        // Проверяем 3x3 блок
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[startRow + i][startCol + j] === num) return false;
            }
        }

        return true;
    }

    // Решаем судоку с помощью backtracking
    _solveSudoku() {
        let emptyCell = this._findEmptyCell();
        if (!emptyCell) return true; // Все клетки заполнены

        const [row, col] = emptyCell;

        for (let num = 1; num <= 9; num++) {
            if (this._isSafe(row, col, num)) {
                this.grid[row][col] = num;

                if (this._solveSudoku()) return true;

                this.grid[row][col] = 0; // Backtrack
            }
        }

        return false;
    }

    // Находим первую пустую ячейку
    _findEmptyCell() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j] === 0) return [i, j];
            }
        }
        return null;
    }

    // Создаем головоломку, удаляя числа
    _createPuzzle(difficulty) {
        const cellsToRemove = {
            easy: 30,    // 51 подсказок
            medium: 40,  // 41 подсказок
            hard: 50,    // 31 подсказок
            expert: 55   // 26 подсказок
        };

        //const cells = 81;
        const puzzle = this.grid.map(row => [...row]);
        let removed = 0;
        const targetRemoved = cellsToRemove[difficulty] || 40;

        while (removed < targetRemoved) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);

            if (puzzle[row][col] !== 0) {
                const backup = puzzle[row][col];
                puzzle[row][col] = 0;

                // Проверяем, что головоломка имеет единственное решение
                if (this._hasUniqueSolution(puzzle)) {
                    removed++;
                } else {
                    puzzle[row][col] = backup; // Восстанавливаем, если несколько решений
                }
            }
        }

        return puzzle;
    }

    // Проверяем, имеет ли головоломка единственное решение
    _hasUniqueSolution(grid) {
        const tempGrid = grid.map(row => [...row]);
        let solutions = 0;
        


        function _countSolutions(board) {
            if (solutions > 1) return; // Прекращаем, если нашли больше одного решения
            
            let emptyCell = _findEmptyCell(board);
            if (!emptyCell) {
                solutions++;
                return;
            }

            const [row, col] = emptyCell;
            
            for (let num = 1; num <= 9 && solutions <= 1; num++) {
                if (_isSafeForBoard(board, row, col, num)) {
                    board[row][col] = num;
                    _countSolutions(board);
                    board[row][col] = 0;
                }
            }
        }
        _countSolutions(tempGrid);
        return solutions === 1;
        function _findEmptyCell(board) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] === 0) return [i, j];
                }
            }
            return null;
        }

        function _isSafeForBoard(board, row, col, num) {
            // Проверка строки
            for (let x = 0; x < 9; x++) {
                if (board[row][x] === num) return false;
            }

            // Проверка столбца
            for (let x = 0; x < 9; x++) {
                if (board[x][col] === num) return false;
            }

            // Проверка 3x3 блока
            const startRow = row - row % 3;
            const startCol = col - col % 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[startRow + i][startCol + j] === num) return false;
                }
            }

            return true;
        }
    }

    // Перемешиваем массив
    _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}


export function getChain(difficulty) {
  const generator = new SudokuGenerator();

  const sudoku = generator.generate(difficulty.toLowerCase());0
  let string = sudoku.puzzle.toString()
  let arr = string.split(',')
  let numarr = arr.map(str => (parseInt(str)));
  return numarr;
}


