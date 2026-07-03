const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.textContent;

        switch (value) {

            case "C":
                expression = "";
                display.value = "";
                break;

            case "←":
                expression = expression.slice(0, -1);
                display.value = expression;
                break;

            case "=":
                try {

                   let result = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");

// Reject consecutive operators
if (/[\+\-\*\/%]{2,}/.test(result)) {
    throw new Error("Invalid expression");
}

display.value = eval(result);
                } catch {

                    display.value = "Error";
                    expression = "";

                }
                break;

            default:
                expression += value;
                display.value = expression;
        }

    });
});

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (!isNaN(key) || "+-*/.%".includes(key)) {
        expression += key;
        display.value = expression;
    }

    if (key === "Enter") {

        try {

            display.value = eval(expression);
            expression = display.value;

        } catch {

            display.value = "Error";
            expression = "";

        }

    }

    if (key === "Backspace") {
        expression = expression.slice(0, -1);
        display.value = expression;
    }

    if (key === "Escape") {
        expression = "";
        display.value = "";
    }

});