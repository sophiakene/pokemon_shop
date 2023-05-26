import { Row, Col, Button, Form, Accordion } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import SidebarMenu from 'react-bootstrap-sidebar-menu'
import { useContext } from "react"
import 'font-awesome/css/font-awesome.min.css'
import { pokeTypes, pokeSizes, pokeColours } from "../../consts"
import AccordionHeader from "react-bootstrap/esm/AccordionHeader"
import AccordionBody from "react-bootstrap/esm/AccordionBody"
import { TypeCheckBox } from "./TypeCheckBox"
import { SizeCheckBox } from "./SizeCheckBox"
import { TypeContext, SizeContext } from "../Products"


function RemoveFilterButton() {
    const { typeCheckedState, setTypeCheckedState } = useContext(TypeContext)
    const { sizeCheckedState, setSizeCheckedState} = useContext(SizeContext)

    function resetFilters() {
        setTypeCheckedState(new Array(typeCheckedState.length).fill(false))
        setSizeCheckedState(new Array(sizeCheckedState.length).fill(false))
    }    
    return (
        <Button
            type="button"
            className="btn btn-danger"
            size="sm"
            style={{justifyContent: 'end'}}
            onClick={resetFilters}>
            Clear filters
        </Button>
    )
}

function SetDefaultButton() {
    return (
        <Button
            type="button"
            className="btn btn-danger"
            size="sm"
<<<<<<< HEAD
            style={{justifyContent: 'end'}}>
            Clear sort
=======
            style={{justifyContent: 'end'}}
        >
            Default
>>>>>>> f3bd3f0a9b3b2deeb58b1e915fcdcf2d59175666
        </Button>
    )
}

function PriceRadio({label} : {label:string}) {
    return (
        <Form.Check
            name="priceRadio"
            type="radio"
            label=
                {<div className="badge bg-dark">
                    {label}
                </div>}
        >    
        </Form.Check>
    )
}


function PriceRadios() {
    const priceRadios = 
        ["Low to High", "High to Low"].map((label) => {
            return (
                <div key={label}>
                    <PriceRadio label={label}/>
                </div>
            )
        })
    return (
        <div>
            {priceRadios}
        </div>
    )
}

function AllTypeCheckBoxes() {
    const allTypeCheckBoxes = 
        pokeTypes.map((pokeType, index) => {
            const color = pokeColours[pokeType as keyof typeof pokeColours]
            return (
                <div key={pokeType}>
                    <TypeCheckBox name={"type"} id={pokeType} color={color} index={index}/>
                </div>
            )
        })
    return (
        <div>
            {allTypeCheckBoxes}
        </div>
    )
}

function AllSizeCheckBoxes() {
    const allSizeCheckBoxes = 
        pokeSizes.map((pokeSize, index) => {
            const color = "black"
            return (
                <div key={pokeSize}>
                    <SizeCheckBox name={"type"} id={pokeSize} color={color} index={index} />
                </div>
            )
        })
    return (
        <div>
            {allSizeCheckBoxes}
        </div>
    )
}

function FilterAccordion() {
    return (
        <Accordion alwaysOpen style={{paddingBottom:"20px"}}>
            <Accordion.Item eventKey="0">
                <AccordionHeader>
                    <h5>
                        Type
                    </h5>
                </AccordionHeader>
                <AccordionBody>
                    <AllTypeCheckBoxes/>
                </AccordionBody>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <AccordionHeader>
                    <h5>
                        Size
                    </h5>
                </AccordionHeader>
                <AccordionBody>
                    <AllSizeCheckBoxes/>
                </AccordionBody>
            </Accordion.Item>
        </Accordion>
    )
}

function SortAccordion() {
    return (
        <Accordion alwaysOpen style={{paddingBottom:"20px"}}>
            <Accordion.Item eventKey="2">
                <AccordionHeader>
                    <h5>
                        Price
                    </h5>
                </AccordionHeader>
                <AccordionBody>
                    <PriceRadios/>
                </AccordionBody>
            </Accordion.Item>
        </Accordion>
    )
}

export function FilterSideBar() {
    return (
        <SidebarMenu style={{height:"100%", textAlign:"left"}} bg="light" variant="dark" className="border">
            <SidebarMenu.Body>
                <div style={{paddingLeft:"20px", paddingRight:"20px", paddingTop:"50px"}}>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={6}>
                            <h3 >
                                Filters <RemoveFilterButton/>
                            </h3>
                            <FilterAccordion/>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={6}>
                            <h3>
                                Sort <SetDefaultButton/>
                            </h3>
                            <SortAccordion/>
                        </Col>
                    </Row>
                </div>
            </SidebarMenu.Body>
        </SidebarMenu>
    )
}
