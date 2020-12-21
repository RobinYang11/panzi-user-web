import React from "react"

interface DefectHeaderProps{
    defect:Idefect
}

export default (props:DefectHeaderProps)=>{

    const {defect} = props

    return (
        
        <div>
            <li>{defect.type}</li>
        </div>
        
    )
}