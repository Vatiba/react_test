import { SelectionProps } from "../types";

const Selection = (props: SelectionProps): JSX.Element => {
   const {
      options,
      name,
      title,
      onChangeSelection
   } = props;

   return (
      <>
         <div>
            <label className="form-label" htmlFor={name}>{title}</label>
         </div>
         <select className="form-select mb-3"
            name={name} id={name}
            onChange={(event) => { onChangeSelection(event.target) }}
         >
            {
               options.map((item, index) => (
                  <option key={index} value={item.value}>{item.label}</option>
               ))
            }
         </select>
      </>
   )
}

export default Selection;