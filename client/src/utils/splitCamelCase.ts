export default function splitCamelCase(text:string) {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
}
