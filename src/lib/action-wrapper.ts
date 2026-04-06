/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionResponse } from "@/types";
import { handleActionError } from "./handle-action-error";

type AsyncAction<Args extends any[], Return> = (
  ...args: Args
) => Promise<ActionResponse<Return>>;

export const actionWrapper = <Args extends any[], Return>(
  action: AsyncAction<Args, Return>,
): AsyncAction<Args, Return> => {
  return async (...args: Args) => {
    try {
      return await action(...args);
    } catch (error) {
      return handleActionError(error) as ActionResponse<Return>;
    }
  };
};
