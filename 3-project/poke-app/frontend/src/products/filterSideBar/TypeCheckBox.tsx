import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from "react"
import 'font-awesome/css/font-awesome.min.css'
import { TypeContext } from "../Products"


export function TypeCheckBox({name, id, color, index} : {name: string, id: string, color:string, index:number}) {
    const { typeCheckedState, setTypeCheckedState} = useContext(TypeContext)

    function handleOnChange(pos: number) {
        const updatedTypeCheckedState = typeCheckedState.map((item, i) => {
            if (i === pos) {
                return !item
            } else {
                return item
            }
        })
        setTypeCheckedState(updatedTypeCheckedState)
    }
    return (
        <Form.Check
            name={name}
            id={id}
            label={
                <div className="badge" style={{backgroundColor:color}}>
                    {id}
                </div>}
            checked={typeCheckedState[index]}
            onChange={(() => handleOnChange(index))}
        >    
        </Form.Check>
    )
}