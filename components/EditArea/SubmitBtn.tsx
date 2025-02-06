import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFileStore } from "../../src/file-store";
import { type ToolState, setField } from "../../src/store";
import type { edit_page, errors } from "../../src/content";
import { fetchSubscriptionStatus, canUseSiteToday } from "fetch-subscription-status";
import { useState } from "react";
export function SubmitBtn({
  k,
  edit_page,
  errors
}: {
  k: string;
  edit_page: edit_page;
  errors: errors
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

  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <button
      className={`submit-btn btn btn-lg text-white position-relative overflow-hidden ${k} grid-footer`}
      onClick={async () => {
        dispatch(setField({ isSubmitted: true }));
        dispatch(setField({ showOptions: false }));
        const status = await fetchSubscriptionStatus();
        // Validate usage limits
        if (!canUseSiteToday(3) && !status) {
          dispatch(setField({ errorMessage: errors.ERR_MAX_USAGE.message }));
          dispatch(setField({ errorCode: "ERR_MAX_USAGE" }));
          setIsDisabled(false);
          return false;
        }

        if (submitBtn) {
          submitBtn?.current?.click();
        }
      }}
      disabled={errorMessage.length > 0 || prompt.length === 0 || !strategy || isDisabled}
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