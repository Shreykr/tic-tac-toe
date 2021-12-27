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
  let boxValue = "X";

  const attachBoxEventListener = (target) => {
    target.forEach((box, index) =>
      box.addEventListener("click", (event) => {
        if (box.innerHTML === "") {
          box.innerHTML = boxValue;
        } else {
          Swal.fire("Box already filled", "", "error");
        }
      })
    );
  };

  let boxes = document.querySelectorAll(".box");
  console.log(boxes);
  attachBoxEventListener(boxes);
  let reset = document.getElementById("reset");
};

resetButtonAnimationHandler();
handleTicTacToe();
