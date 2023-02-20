declare module "*.jpg" {
  const content: string
  export default content
}

declare module "*.css" {
  const content: { [key: string]: string }
  export default content
}

declare module "*.png" {
  const content: string
  export default content
}
