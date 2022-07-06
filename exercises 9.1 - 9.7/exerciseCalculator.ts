interface ExerciseValues {
  value1: Array<number>
  value2: number
}

const parseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 10) throw new Error('Too many arguments');

  const array = args;
  array.splice(0, 2);
  const lastElement = array.pop();
  const arrayWithoutLastElement = array;
  const arrayOfNumbers = arrayWithoutLastElement.map(value => Number(value));


  if (
    !args.map(v => isNaN(Number(v)) ? "NaN" : "number").includes("NaN")
  ) {
    return {
      value1: arrayOfNumbers,
      value2: Number(lastElement)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }

};


interface Result {
  days: number,
  trainingDays: number,
  targetHours: number,
  average: number,
  outcome: boolean,
  rating: number,
  ratingExplained: string | undefined
}

export const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
  const value1 = dailyHours.length;
  const value2 = dailyHours.filter(d => d !== 0).length;
  const value3 = target;
  const value4 = dailyHours.reduce((sum, value) => {
    return sum + value;
  }, 0) / dailyHours.length;
  const value5 = value4 >= target ? true : false;
  const value6 = () => {
    if (value4 < value3) return 1;
    else if (value4 === value3) return 2;
    else return 3;
  };
  const value7 = () => {
    if (value6() === 1) return "you didn't meet your target";
    else if (value6() === 2) return "you met your target";
    else if (value6() === 3) return "you did better than your target";
    else return undefined;
  };

  return {
    days: value1,
    trainingDays: value2,
    targetHours: value3,
    average: value4,
    outcome: value5,
    rating: value6(),
    ratingExplained: value7()
  };

};

// console.log(calculateExercises([1, 0, 2, 3, 0, 5, 4], 2))
try {
  const { value1, value2 } = parseArgs(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}