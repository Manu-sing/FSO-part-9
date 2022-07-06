import { PartType } from '../types'

const Part = ({ part }: PartType) => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>Exercise count: {part.exerciseCount}</p>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Group Projects: {part.groupProjectCount}</p>
                </div>
            );
        case "submission":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Submission link: {part.exerciseSubmissionLink}</p>
                </div>
            );
        case "special":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Requirements : {part.requirements.map(req => req).join(" - ")}</p>
                </div>
            );
        default:
            return null;
    }

}

export default Part