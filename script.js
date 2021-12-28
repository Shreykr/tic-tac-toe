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
  let initialValue = boxValue;
  let tracker = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const resetAll = () => {
    boxes.forEach((box, index) => {
      box.innerHTML = "";
      box.style.backgroundColor = "white";
    });

    if (tracker.includes("X") || tracker.includes("O")) {
      initialValue === "X" ? (initialValue = "O") : (initialValue = "X");
      boxValue = initialValue;
    }
    tracker = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8);

    if (initialValue === "X") {
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Player 1 (X) starts now",
          confirmButtonText: "Let's Go!",
          showConfirmButton: true,
        });
      }, 300);
    } else {
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Player 2 (O) starts now",
          confirmButtonText: "Let's Go!",
          showConfirmButton: true,
        });
      }, 300);
    }
  };

  const updatePoints = (pos1, pos2, pos3) => {
    if (tracker[pos1] === "X") {
      score1.innerHTML = Number(score1.innerHTML) + 1;
    } else if (tracker[pos1] === "O") {
      score2.innerHTML = Number(score2.innerHTML) + 1;
    }
    boxes[pos1].style.backgroundColor = "rgba(152,251,152,0.55)";
    boxes[pos2].style.backgroundColor = "rgba(152,251,152,0.55)";
    boxes[pos3].style.backgroundColor = "rgba(152,251,152,0.55)";
    Swal.fire({
      icon: "success",
      title: tracker[pos1] === "X" ? `Player-1 Wins` : `Player-2 Wins`,
      timer: "3050",
      showConfirmButton: false,
    }).then((result) => {
      if (
        result.dismiss === Swal.DismissReason.backdrop ||
        result.dismiss === Swal.DismissReason.esc ||
        result.dismiss === Swal.DismissReason.timer
      ) {
        resetAll();
      } else {
        setTimeout(() => {
          resetAll();
        }, 3050);
      }
    });
  };

  const checkWinner = () => {
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
    } else if (
      tracker[0] !== undefined &&
      tracker[0] === tracker[3] &&
      tracker[0] === tracker[6]
    ) {
      updatePoints(0, 3, 6);
    } else if (
      tracker[0] !== undefined &&
      tracker[0] === tracker[4] &&
      tracker[0] === tracker[8]
    ) {
      updatePoints(0, 4, 8);
    } else if (
      tracker[1] !== undefined &&
      tracker[1] === tracker[4] &&
      tracker[1] === tracker[7]
    ) {
      updatePoints(1, 4, 7);
    } else if (
      tracker[0] !== undefined &&
      tracker[0] === tracker[3] &&
      tracker[0] === tracker[6]
    ) {
      updatePoints(2, 3, 6);
    } else if (
      tracker[2] !== undefined &&
      tracker[2] === tracker[5] &&
      tracker[2] === tracker[8]
    ) {
      updatePoints(2, 5, 8);
    } else if (
      tracker[3] !== undefined &&
      tracker[3] === tracker[4] &&
      tracker[3] === tracker[5]
    ) {
      updatePoints(3, 4, 5);
    } else if (
      tracker[2] !== undefined &&
      tracker[2] === tracker[4] &&
      tracker[2] === tracker[6]
    ) {
      updatePoints(2, 4, 6);
    } else if (
      tracker[6] !== undefined &&
      tracker[6] === tracker[7] &&
      tracker[6] === tracker[8]
    ) {
      updatePoints(6, 7, 8);
    } else {
      if ([...new Set(tracker)].length === 2) {
        Swal.fire({
          icon: "info",
          title: "Draw !",
          timer: "1950",
          showConfirmButton: false,
        }).then((result) => {
          if (
            result.dismiss === Swal.DismissReason.backdrop ||
            result.dismiss === Swal.DismissReason.esc ||
            result.dismiss === Swal.DismissReason.timer
          ) {
            resetAll();
          } else {
            setTimeout(() => {
              resetAll();
            }, 1950);
          }
        });
      }
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
            timer: "1650",
            showConfirmButton: false,
          });
        }
      })
    );
  };

  const attachResetHandler = (target) => {
    target.addEventListener("click", (event) => {
      resetAll();
      score1.innerHTML = 0;
      score2.innerHTML = 0;
    });
  };

  attachBoxEventListener(boxes);
  attachResetHandler(reset);
};

resetButtonAnimationHandler();
handleTicTacToe();
