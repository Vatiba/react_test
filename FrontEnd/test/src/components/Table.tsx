import { TableProps } from "../types";

const Table = (props: TableProps): JSX.Element => {
   const { data } = props;

   return (
      <table className="table">
         <thead className="table-dark">
            <tr>
               <th scope="col">Date</th>
               <th scope="col">Name</th>
               <th scope="col">Quantity</th>
               <th scope="col">Distance</th>
            </tr>
         </thead>
         <tbody>
            {
               data ? data.map((item, index) => {
                  return (
                     <tr key={index}>
                        <th>{item.date.split('T')[0]}</th>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.distance}</td>
                     </tr>
                  )
               })
                  :
                  null
            }
         </tbody>
      </table>
   )
}

export default Table;