import { LoadingProps } from "../types";

const Loading = (props: LoadingProps): JSX.Element => {
   return (
      <div className="spinner-border text-success" style={{
         width: '3rem', height: '3rem',
      }} role="status">
         <span className="visually-hidden">Loading...</span>
      </div>
   )
}

export default Loading;