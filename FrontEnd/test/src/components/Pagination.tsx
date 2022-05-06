import { useState } from "react";
import { PaginationProps } from "../types";
import { range } from "../utils/helpers";

const Pagination = (props: PaginationProps): JSX.Element => {
   const {
      portionSize = 5,
      pageSize,
      totalItemsCount = 0,
      onChangePage,
      currentPage,
   } = props;

   let pagesCount = Math.ceil(totalItemsCount / pageSize)

   const [portionNumber, setPortionNumber] = useState(1);
   let portionCount = Math.ceil(pagesCount / portionSize);
   let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
   let rightPortionPageNumber = portionNumber * portionSize;

   return (
      <nav>
         <ul className="pagination">
            {
               portionNumber > 1 &&
               <li className="page-item">
                  <a href="#" onClick={() => setPortionNumber(portionNumber - 1)} className="page-link">
                     <span aria-hidden="true">&laquo;</span>
                  </a>
               </li>
            }
            {
               // range, creates array between given numbers. For example [1, 2, 3, 4, ..., pagesCount]
               range(1, pagesCount)
                  .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                  .map((p, index) => {
                     return (
                        <li key={index} className={`page-item ${currentPage === p ? 'active' : ''}`}>
                           <a href="#" onClick={() => { onChangePage(p) }}
                              className='page-link'>
                              {p}
                           </a>
                        </li>
                     )
                  })
            }
            {portionCount > portionNumber &&
               <li className="page-item">
                  <a href="#" className="page-link" onClick={() => { setPortionNumber(portionNumber + 1) }}>
                     <span aria-hidden="true">&raquo;</span>
                  </a>
               </li>
            }
         </ul>
      </nav>
   )
}

export default Pagination;