export default function errorHandler(fn: Function, message: string) {
  try {
    fn();
  } catch (e) {
    throw new Error(message);
  }
}
