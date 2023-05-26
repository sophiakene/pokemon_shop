import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css'


export function RemoveButton({ handleClick } : { handleClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Button
            type="button"
            id="removeButton"
            className = "btn btn-dark"
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faXmark}/>
        </Button>
    )
}