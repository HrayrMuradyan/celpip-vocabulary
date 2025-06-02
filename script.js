document.addEventListener("DOMContentLoaded", () => {
  let data = [];
  let current = 0;
  let incorrectCount = 0;

  const input = document.getElementById("guess");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const result = document.getElementById("result");
  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");
  const progressBar = document.getElementById("progress-bar");
  const incorrectCounter = document.getElementById("incorrect-counter");
  const showAnswerBtn = document.getElementById("show-answer-btn");

  document.getElementById("start-btn").onclick = async () => {
    try {
      const res = await fetch("vocab.json");
      data = await res.json();
      data = shuffle(data);
      document.getElementById("start-btn").style.display = "none";
      document.getElementById("game").style.display = "block";
      showCurrent();
      updateProgress();
    } catch (err) {
      alert("⚠️ Could not load vocab.json.");
      console.error(err);
    }
  };

  function showCurrent() {
    const entry = data[current];
    const img = document.getElementById("image");

    img.src = entry.image;
    input.value = "";
    result.innerText = "";
    nextBtn.disabled = true;
    prevBtn.disabled = current === 0;
    showAnswerBtn.disabled = false;

    input.focus();
    updateProgress();
  }

  input.addEventListener("input", () => {
    nextBtn.disabled = input.value.trim() === "";
  });

  nextBtn.addEventListener("click", () => {
    const guess = input.value.trim().toLowerCase();
    const correct = data[current].word.toLowerCase();

    if (guess === correct) {
      correctSound.play();
      current++;
      if (current < data.length) {
        showCurrent();
      } else {
        updateProgress();
        document.getElementById("game").innerHTML = `
          <h2>🎉 You finished all the words!</h2>
          <p>Total incorrect attempts: ${incorrectCount}</p>
        `;
      }
    } else {
      incorrectCount++;
      updateIncorrectCounter();
      wrongSound.play();
      result.innerText = "❌ Incorrect. Try again!";
    }
  });

  prevBtn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showCurrent();
    }
  });

  showAnswerBtn.addEventListener("click", () => {
    const correct = data[current].word;
    result.innerText = `✅ Answer: ${correct}`;
    showAnswerBtn.disabled = true;
  });

  function updateProgress() {
    const percent = Math.round((current / data.length) * 100);
    progressBar.style.width = `${percent}%`;
  }

  function updateIncorrectCounter() {
    incorrectCounter.innerText = `❌ Incorrect attempts: ${incorrectCount}`;
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextBtn.click();
    }
  });
});

