import { InputProps } from "../types";

const Input = (props: InputProps): JSX.Element => {
   const {
      onChange,
      value,
      placeholder,
      name,
      title,
   } = props;

   return (
      <>
         <div>
            <label className="form-label" htmlFor={name}>{title}</label>
         </div>
         <input id={name} type="text" className="form-control" placeholder={placeholder} value={value}
            onChange={(event) => { onChange(event.target) }}
         />
      </>
   )
}

export default Input;