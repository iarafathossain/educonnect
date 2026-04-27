export type ActionResponse<T = undefined> =
  | { success: true; data?: T }
  | {
      success: false;
      error: string;
      statusCode: number;
      fieldErrors?: Record<string, string[]>;
    };
