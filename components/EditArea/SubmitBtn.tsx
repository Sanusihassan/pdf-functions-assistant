import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFileStore } from "../../src/file-store";
import { type ToolState, setField } from "../../src/store";
import type { edit_page, errors } from "../../src/content";
import { getAITokens, getUserInfo, getUserSubscription } from "fetch-subscription-status";
import type { JSX, RefObject } from "react";

export function SubmitBtn({
  k,
  edit_page
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
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );

  return (
    <button
      className={`submit-btn btn btn-lg text-white position-relative overflow-hidden ${k} grid-footer`}
      onClick={async () => {
        dispatch(setField({ isSubmitted: true }));
        dispatch(setField({ showOptions: false }));
        // Get subscription status
        const { isActive: status, subscription } = await getUserSubscription();
        const user = await getUserInfo();
        const aiTokens = user ? await getAITokens(user.id) : 0;
        dispatch(setField({ subscriptionAndStatus: { status, subscription } }));
        if (process.env.NODE_ENV === "development") {
          submitBtn?.current?.click();
          return;
        }
        // Redirect to pricing if no active subscription
        if (!status || aiTokens === 0) {
          location.href = "/pricing";
          return;
        }

        // Proceed with submission if checks pass
        if (submitBtn) {
          (submitBtn as RefObject<HTMLButtonElement>)?.current?.click();
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