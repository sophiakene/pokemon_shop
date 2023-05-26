import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMinus} from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css'

export function DecButton({ handleClick } : { handleClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Button
            type="button"
            id="incButton"
            className = "btn btn-danger"
            size="sm"
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faMinus}/>
        </Button>
    )
}