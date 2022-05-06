export const getOffsetFromPage = (pageNumber: number, itemsPerPage: number) => {
   return (pageNumber - 1) * itemsPerPage
}

export const range = (start: number, end: number) => {
   return Array(end - start + 1).fill(undefined).map((_, idx) => start + idx)
}

// export const getPageFromOffset = (offsetNumber: number, itemsPerPage: number) => {
//    return offsetNumber / itemsPerPage + 1}
// }