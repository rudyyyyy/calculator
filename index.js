class Calculator {
    constructor (prevOutput, currOutput) {
        this.prevOutput = prevOutput
        this.currOutput = currOutput
        this.clear()
    }

    clear() {
        this.prevOutputDefault = ''
        this.currOutputDefault = ''
        this.operation = undefined
    }

    del() {
        this.currOutputDefault = this.currOutputDefault.toString().slice(0, -1)
    }

    appendNum(number) {
        if (number === '.' && this.currOutputDefault.includes('.')) return
        this.currOutputDefault = this.currOutputDefault.toString() + number.toString()
    }

    selectOperator(operation) {
        if (this.currOutputDefault === '') return
        if (this.prevOutputDefault !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOutputDefault = this.currOutputDefault
        this.currOutputDefault = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOutputDefault)
        const curr = parseFloat(this.currOutputDefault)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return
        }
        this.currOutputDefault = computation
        this.operation = undefined
        this.prevOutputDefault = ''
    }

    getDisplayNum(number) {
        const stringNum = number.toString()
        const intDigits = parseFloat(stringNum.split('.')[0])
        const decDigits = stringNum.split('.')[1]

        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decDigits != null) {
            return `${intDisplay}.${decDigits}`
        } else {
            return intDisplay
        }
        // const floatNum = parseFloat(number)
        // if (isNaN(floatNum)) return ''
        // return floatNum.toLocaleString('en')
    }

    updateDisp() {
        this.currOutput.innerText =
            this.getDisplayNum(this.currOutputDefault)
        if (this.operation != null) {
            this.prevOutput.innerText =
                `${this.prevOutputDefault} ${this.operation}`
        } else {
            this.prevOutput.innerText = ''
        }
        
    }

}

const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-del]')
const allClearBtn = document.querySelector('[data-all-clear]')
const prevOutput = document.querySelector('[data-prev-output]')
const currOutput = document.querySelector('[data-curr-output]')

const calc = new Calculator(prevOutput, currOutput)

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNum(button.innerText)
        calc.updateDisp()
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calc.selectOperator(button.innerText)
        calc.updateDisp()
    })
})

equalsBtn.addEventListener('click', button => {
    calc.compute()
    calc.updateDisp()
})

allClearBtn.addEventListener('click', button => {
    calc.clear()
    calc.updateDisp()
})

deleteBtn.addEventListener('click', button => {
    calc.del()
    calc.updateDisp()
})

