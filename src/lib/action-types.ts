export type ActionResponse<T = undefined> =
  | {
      success: true;
      statusCode: number;
      message?: string;
      data?: T;
    }
  | {
      success: false;
      error: string;
      statusCode: number;
      message?: string;
      fieldErrors?: Record<string, string[]>;
    };
