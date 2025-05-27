// import { Spinner } from "react-bootstrap";

// this is a loader component instead of spinners i want to use a placeholder
export const Loader = ({ loader_text }: { loader_text: string }) => (
  <div className="loader">
    {/* <Spinner as="span" animation="grow" role="status" aria-hidden="true" />{" "} */}
    <div className="inner-loader">{loader_text}</div>
  </div>
);
