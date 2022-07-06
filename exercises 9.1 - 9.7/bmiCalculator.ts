interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const m = height / 100;
  const m2 = m * m;
  const bmi = Math.round((weight / m2) * 10) / 10;
  if (bmi < 18.4) {
    return `Your bmi is ${bmi}, you are underweight`;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return `Your bmi is ${bmi}, you are normalweight`;
  } else return `Your bmi is ${bmi}, you are overweight`;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}