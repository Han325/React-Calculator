import React from 'react'
import "./styles.css"

class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            prev: "",
            current: "",
            operation: undefined,
            result: "",
            isNegative: false,
            doInitialize: false
        }
        this.addNumber = this.addNumber.bind(this)
        this.chooseOperation = this.chooseOperation.bind(this)
        this.compute = this.compute.bind(this)
        this.clear = this.clear.bind(this)
        this.delete = this.delete.bind(this)
        this.percentage = this.percentage.bind(this)
        this.setSign = this.setSign.bind(this)
    }

    addNumber(event){
        const {value} = event.target
        if(value ==='.' && this.state.current.includes(".")) return
        if(value ==='0' && this.state.current.includes("0")) return
        this.setState(prevState => {
            return{
                current: prevState.current+value,
                doInitialize: false
            }
        
        })
    }

    chooseOperation(event){
        const {value} = event.target
        if(this.state.current === "") return
        if(this.state.prev !== ""){
            this.compute()
        }
        this.setState(prevState => {
            return{
                prev: prevState.current + " " + value,
                current: "",
                operation: value
            }
        })
    }

    compute(){
        let computation
        const prevNum = parseFloat(this.state.prev)
        const currentNum = parseFloat(this.state.current)
        if(isNaN(prevNum) || isNaN(currentNum)) return
        switch(this.state.operation){
            case '+':
                computation = prevNum + currentNum
                break
            case '-':
                computation = prevNum - currentNum
                break
            case '*':
                computation = prevNum * currentNum
                break
            case '/':
                computation = prevNum / currentNum
                break
            default: 
              return
        }
        this.setState({
            current: computation,
            operation: undefined,
            prev: ""
        })

    }

    percentage(){
        this.setState(prevState => {
            return {
                current: prevState.current / 100
            }
        })
    }

    setSign(event){
        const {value} = event.target
        if(value ==='/-' && this.state.current.includes("-")) return
        if(this.state.isNegative === false){
            this.setState(prevState => {
                return { 
                    current: "-" + prevState.current
                }
            })
        } else { 
            return   
        }  
    }

    clear(){
        this.setState({
            prev: "",
            current:"",
            operation: undefined,
            doInitialize: true

        })
    }

    delete() {
        this.setState(prevState => {
            return{
                current: prevState.current.toString().slice(0,-1)
            }
        })
    }

    render(){
        return(
            <div className="calculator-bg">
                <div className = "calculator">
                    <input type="text" className="calculator-process" value={this.state.prev} disabled />
                    <input type="text" id="display" className="calculator-screen" value={this.state.doInitialize? "0": this.state.current} placeholder="0" disabled />
                    <div className="calculator-keys">
                        <button type="button" id="clear"className="all-clear" value="all-clear" onClick={this.clear}>C</button>
                        <button type="button" className="operator" value="%" onClick={this.percentage}>%</button>
                        <button type="button" className="operator" value="/-" onClick={this.setSign}>+/-</button>
                        <button type="button" id="divide" className="operator" value="/" onClick={this.chooseOperation}>&divide;</button>
                        <button type="button" className="operator" value="*" onClick={this.chooseOperation} id="multiply">&times;</button>
                        <button type="button" className="operator" value="-" onClick={this.chooseOperation} id ="subtract">-</button>
                        <button type="button" className="operator" value="+" onClick={this.chooseOperation} id="add">+</button>
                        <button type="button" id="seven"value="7" onClick={this.addNumber}>7</button>
                        <button type="button" id="eight"value="8" onClick={this.addNumber}>8</button>
                        <button type="button" id="nine"value="9" onClick={this.addNumber}>9</button>
                        <button type="button" id="four"value="4" onClick={this.addNumber}>4</button>
                        <button type="button" id="five"value="5" onClick={this.addNumber}>5</button>
                        <button type="button" id="six"value="6" onClick={this.addNumber}>6</button>
                        <button type="button" id="one"value="1" onClick={this.addNumber}>1</button>
                        <button type="button" id="two"value="2" onClick={this.addNumber}>2</button>
                        <button type="button" id="three"value="3" onClick={this.addNumber}>3</button>
                        <button type="button" id="zero"value="0" onClick={this.addNumber}>0</button>
                        <button type="button" id="" value="<" onClick={this.delete}>&lt;</button>
                        <button type="button" id="decimal" className="decimal" value="." onClick={this.addNumber}>.</button>
                        <button type="button" id="equals" className="equal-sign" value="=" onClick={this.compute}>=</button>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Main
