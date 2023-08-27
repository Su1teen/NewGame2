const letters = 'ВЖЗМЛНРСТЦ';
const duplicatedLetters = [...letters]; // Letters appear twice
const shuffledLetters = shuffleArray(duplicatedLetters);

const gameContainer = document.querySelector('.game-container');

shuffledLetters.forEach(letter => {
  const uppercaseLetter = document.createElement('div');
  const lowercaseLetter = document.createElement('div');
  uppercaseLetter.classList.add('letter', 'uppercase');
  lowercaseLetter.classList.add('letter', 'lowercase');
  uppercaseLetter.textContent = letter;
  lowercaseLetter.textContent = letter.toLowerCase();

  // Place letters randomly within the grid
  const randomPosition = Math.floor(Math.random() * gameContainer.children.length);
  gameContainer.insertBefore(uppercaseLetter, gameContainer.children[randomPosition]);
  gameContainer.insertBefore(lowercaseLetter, gameContainer.children[randomPosition]);

  makeLetterDraggable(uppercaseLetter);
  makeLetterDraggable(lowercaseLetter);
});

let draggedLetter = null;

function makeLetterDraggable(letterElement) {
  letterElement.setAttribute('draggable', true);

  letterElement.addEventListener('dragstart', function (e) {
    draggedLetter = e.target;
  });

  letterElement.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  letterElement.addEventListener('drop', function (e) {
    e.preventDefault();
    if (draggedLetter !== null && draggedLetter !== letterElement) {
      if (draggedLetter.textContent.toLowerCase() === letterElement.textContent) {
        // Matched!
        draggedLetter.style.visibility = 'hidden';
        letterElement.style.visibility = 'hidden';
      }
      draggedLetter = null;
    }
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
