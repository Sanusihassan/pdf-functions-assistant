import { ExclamationCircleIcon } from "@heroicons/react/solid";
// import { ToolStoreContext } from "../ToolStoreContext";
import { useSelector } from "react-redux";
import type { ToolState } from "../src/store";

const ErrorElement = () => {
  // const dispatch = useDispatch();
  const showErrorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.showErrorMessage
  );

  const errorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.errorMessage
  );
  return (
    <>
      <div
        style={{
          display: errorMessage.length ? "block" : "none",
        }}
        className="error-element alert alert-danger text-center mt-3"
        role="alert"
      >
        <ExclamationCircleIcon
          className="w-5 h-5 hide-on-ltr"
          viewBox="0 0 22 22"
        />{" "}
        <bdi className="d-inline-flex">{errorMessage}</bdi>{" "}
        <ExclamationCircleIcon
          className="w-5 h-5 hide-on-rtl"
          viewBox="0 0 22 22"
        />
      </div>
    </>
  );
};

export default ErrorElement;
