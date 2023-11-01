import { Center, ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');
  const [winner, setWinner] = useState(null);

  function selectSquare(i) {
    if (winner || squares[i]) { 
      return
    }

    const newSquares = squares.slice();
    newSquares[i] = nextValue;
    setSquares(newSquares);
    setNextValue(nextValue === 'X' ? 'O' : 'X');
    const newWinner = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner);
    }
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
    setWinner(null);
  }

  function renderSquare(i) {
    return squares[i] === 'O' ? (
      <Button colorScheme='blue' variant='solid' size='lg' p={4} m={1} className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </Button>
    ) : (
      <Button colorScheme='blue' variant='outline' size='lg' p={4} m={1} className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </Button>
    );
  }

  return (
  <div>  
    <div>
      <div>
        <Center mt={20}>
          <div>
            <Text as='b' color='teal' fontSize='4xl' fontFamily='mono'>Tic Tac Toe</Text>
          </div>
        </Center>
        <Center mb={10}>
        <div>
          <Text color={'teal'} fontSize={'xl'} fontFamily={'monospace'}>{calculateStatus(winner, squares, nextValue)}</Text>
        </div>
        </Center>
        <Center>
          <div>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
        </Center>
        <Center>
          <div>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          </Center>
          <Center>
          <div>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </Center>
        <Center>
          <Button colorScheme='teal' variant='solid' size='lg' mt={10} onClick={restart}>Restart</Button>
        </Center>
      </div>
    </div>
  </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
  <ChakraProvider>
    <Game />
  </ChakraProvider>
  );
}

export default App;
