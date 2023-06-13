const resultContainer = document.getElementById("resultContainer");
const cpfInput = document.getElementById("cpfInput");
const cpfButton = document.getElementById("cpfButton");
const resultH2 = document.getElementById("resultH2");

cpfInput

cpfButton.addEventListener("click", () => {
    handleSubmit();
});

function handleSubmit() {
    let cpf = new CPF(cpfInput.value);
    if (cpf.isValid) {
        resultContainer.className = "result__container true";
        resultH2.innerHTML = "CPF VÁLIDO";
    } else {
        resultContainer.className = "result__container false";
        resultH2.innerHTML = "CPF NÃO VÁLIDO";
    }
}

class CPF {
    constructor(original) {
        this.original = original;
        this.isValid = this.checkCPF();
    }

    checkCPF() {
        let total = 0;
        let toMultiply = 10;
        let temporaryCPF = this.original.slice(0, 9).split("");
        for (let i = 0; i < 2; i++) {
            temporaryCPF.map((digit) => {
                total += parseInt(digit) * toMultiply;
                toMultiply--;
            });
            total %= 11;
            if (total < 2) {
                temporaryCPF.push("0");
            } else {
                total = 11 - total;
                temporaryCPF.push(total.toString());
            }
            toMultiply = 11;
            total = 0;
        }
        this.calculated = temporaryCPF.join("");

        if (this.original === this.calculated) {
            return true;
        }
        return false;
    }
}

console.log(new CPF("11144477735").isValid); // true
console.log(new CPF("11144477734").isValid); // false