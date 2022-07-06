import React from 'react'
import { ContentType } from '../types'


const Total = ({ courseParts }: ContentType) => {
    return (
        <h3>
            Total number of exercises{": "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </h3>
    )
}

export default Total