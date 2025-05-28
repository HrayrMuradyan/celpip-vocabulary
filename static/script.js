let data = [];
let current = 0;

document.getElementById("start-btn").onclick = async () => {
    const res = await fetch("/get_words");
    data = await res.json();
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("game").style.display = "block";
    showCurrent();
};

function showCurrent() {
    const entry = data[current];
    document.getElementById("image").src = entry.image;
    document.getElementById("guess").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("next-btn").disabled = true;
    document.getElementById("prev-btn").disabled = current === 0;
}

document.getElementById("check-btn").onclick = () => {
    const guess = document.getElementById("guess").value.trim().toLowerCase();
    const correct = data[current].word.toLowerCase();
    if (guess === correct) {
        document.getElementById("result").innerText = `✅ Correct: ${data[current].word}`;
        document.getElementById("next-btn").disabled = current === data.length - 1;
    } else {
        document.getElementById("result").innerText = "❌ Try again!";
    }
};

document.getElementById("next-btn").onclick = () => {
    if (current < data.length - 1) {
        current++;
        showCurrent();
    }
};

document.getElementById("prev-btn").onclick = () => {
    if (current > 0) {
        current--;
        showCurrent();
    }
};