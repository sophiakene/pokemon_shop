import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from "react"
import 'font-awesome/css/font-awesome.min.css'
import { SizeContext } from "../Products"


export function SizeCheckBox({name, id, color, index} : {name: string, id: string, color:string, index:number}) {
    const { sizeCheckedState, setSizeCheckedState} = useContext(SizeContext)

    function handleOnChange(pos: number) {
        const updatedSizeCheckedState = sizeCheckedState.map((item, i) => {
            if (i === pos) {
                return !item
            } else {
                return item
            }
        })

        setSizeCheckedState(updatedSizeCheckedState) 
    }
    return (
        <Form.Check
            name={name}
            id={id} 
            label={<div className="badge bg-secondary">
                    {id}
                </div>}
            checked={sizeCheckedState[index]}
            onChange={(() => handleOnChange(index))}
        >    
        </Form.Check>
    )
}