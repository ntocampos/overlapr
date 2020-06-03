type Pipeable<T> = (input: T) => T

const pipe = (...functions: Pipeable<any>[]) => (input: any) =>
  functions.reduce((acc, f) => f(acc), input)

export default pipe
