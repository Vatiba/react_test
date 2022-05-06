export type PaginationProps = {
   /** @defaultValue 5 */
   portionSize?: number,
   pageSize: number,
   /** @defaultValue 0 */
   totalItemsCount?: number,
   onChangePage: (page: number) => void
   currentPage: number,
}