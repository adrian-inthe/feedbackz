export function getImageSrc(imageName: string) {
  return new URL(`../assets/${imageName}.svg`, import.meta.url).href;
}
