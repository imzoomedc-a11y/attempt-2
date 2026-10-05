export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Record<string, string>;
  /** Pre-filled email draft for contacting the organization directly. */
  mailtoUrl?: string;
};

export const initialFormState: FormState = {
  status: "idle",
  message: "",
  errors: {},
};
