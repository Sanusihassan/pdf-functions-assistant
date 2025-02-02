import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFileStore } from "../../src/file-store";
import { type ToolState, setField } from "../../src/store";
import type { edit_page } from "../../src/content";
export function SubmitBtn({
  k,
  edit_page,
}: {
  k: string;
  edit_page: edit_page;
}): JSX.Element {
  const dispatch = useDispatch();
  const { submitBtn } = useFileStore();
  // state variables:
  const errorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.errorMessage
  );
  const prompt = useSelector(
    (state: { tool: ToolState }) => state.tool.prompt
  );
  const isSubmitted = useSelector(
    (state: { tool: ToolState }) => state.tool.isSubmitted
  );
  const strategy = useSelector(
    (state: { tool: ToolState }) => state.tool.strategy
  );
  return (
    <button
      className={`submit-btn btn btn-lg text-white position-relative overflow-hidden ${k} grid-footer`}
      onClick={() => {
        dispatch(setField({ isSubmitted: true }));
        dispatch(setField({ showOptions: false }));
        if (submitBtn) {
          submitBtn?.current?.click();
        }
      }}
      disabled={errorMessage.length > 0 || prompt.length === 0 || !strategy}
    >
      <bdi>
        {
          edit_page.action_buttons[
          k.replace(/-/g, "_") as keyof typeof edit_page.action_buttons
          ]
        }
      </bdi>{" "}
      {isSubmitted ? (
        <Spinner as="span" animation="grow" role="status" aria-hidden="true" />
      ) : null}
    </button>
  );
}
