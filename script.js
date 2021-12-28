const resetButtonAnimationHandler = () => {
  let resetButtonState = document.getElementById("reset");
  resetButtonState.addEventListener("mousedown", function () {
    this.style.transform = "scale(0.8)";
  });
  resetButtonState.addEventListener("mouseup", function () {
    this.style.transform = "scale(1)";
  });
  resetButtonState.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
};

const handleTicTacToe = () => {
  let boxes = document.querySelectorAll(".box");
  let reset = document.getElementById("reset");
  let score1 = document.getElementById("score-1");
  let score2 = document.getElementById("score-2");
  let boxValue = "X";
  let tracker = new Array(9);

  const updatePoints = (pos1, pos2, pos3) => {
    if (tracker[pos1] === "X") {
      console.log(score1.innerHTML);
      score1.innerHTML = Number(score1.innerHTML) + 1;
    } else if (tracker[pos1] === "O") {
      score2.innerHTML = Number(score2.innerHTML) + 1;
    }
    Swal.fire({
      icon: "success",
      title: "Win",
      timer: "2250",
      showConfirmButton: false,
    });
  };

  const checkWinner = () => {
    console.log(tracker);
    if (
      tracker[0] !== undefined &&
      tracker[0] === tracker[1] &&
      tracker[0] === tracker[2]
    ) {
      updatePoints(0, 1, 2);
    } else if (
      tracker[0] !== undefined &&
      tracker[0] === tracker[3] &&
      tracker[0] === tracker[6]
    ) {
      updatePoints(0, 3, 6);
    }
  };

  const attachBoxEventListener = (target) => {
    target.forEach((box, index) =>
      box.addEventListener("click", (event) => {
        box.style.backgroundColor = "white";
        if (!box.innerHTML) {
          box.innerHTML = boxValue;
          tracker[index] = boxValue;
          checkWinner();
          boxValue === "X" ? (boxValue = "O") : (boxValue = "X");
        } else {
          Swal.fire({
            icon: "error",
            title: "Box already filled",
            timer: "2250",
            showConfirmButton: false,
          });
        }
      })
    );
  };

  const resetAll = () => {
    score1.innerHTML = 0;
    score2.innerHTML = 0;
    boxes.forEach((box, index) => {
      box.innerHTML = "";
    });
    tracker = new Array(9);
    if (boxValue === "X") {
      Swal.fire({
        icon: "success",
        title: "Player 1 (X) starts now",
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Player 2 (O) starts now",
        showConfirmButton: true,
      });
    }
  };

  const attachResetHandler = (target) => {
    target.addEventListener("click", (event) => {
      resetAll();
    });
  };

  attachBoxEventListener(boxes);
  attachResetHandler(reset);
};

resetButtonAnimationHandler();
handleTicTacToe();
