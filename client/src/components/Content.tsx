import { ContentType } from "../types"
import Part from "./Part"



const Content = ({ courseParts }: ContentType) => {


    return (
        <div>
            {courseParts.map((p, i) =>

                <Part key={i} part={p} />
            )}
        </div>
    )
}

export default Content