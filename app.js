let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");


let turnO = true; //playerO or playerX

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){ // for player O
            box.innerText = "O";
            turnO = false;
            box.style.color = "#b0413e";
        }
        else{ // for player X
            box.innerText = "X";
            turnO = true;
            box.style.color = "green";
        }
        box.disabled =true;
        
        checkWinner();
    });
});

    const disableBoxes = () =>{
        for(let box of boxes){
            box.disabled = true;
        }
    };

    const enableBoxes = () =>{
        for(let box of boxes){
            box.disabled = false;
            box.innerText = "";
        }
    };
    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };


    const checkWinner = () => {
        let draw = true; // assume its a true
        for( let pattern of winPatterns){
            let pos1Val  = boxes[pattern[0]].innerText;
            let pos2Val  = boxes[pattern[1]].innerText;
            let pos3Val  = boxes[pattern[2]].innerText;

            if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
                if(pos1Val === pos2Val && pos2Val === pos3Val){
                    showWinner(pos1Val);
                draw = false;
                }

            }

        }
        if (draw) {
            // Check for a draw
            for (let box of boxes) {
              if (box.innerText === "") {
                draw = false; // If any box is empty, it's not a draw
                break;
              }
            }
        }

        if (draw) {
            // If all boxes are filled and no winner
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }

    };

    newGameBtn.addEventListener("click",resetGame);
    resetBtn.addEventListener("click" , resetGame);
