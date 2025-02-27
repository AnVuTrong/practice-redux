import { useState, useEffect } from 'react';

export interface FormState<T> {
  formData: T;
  isSaved: boolean;
  isLoading: boolean;
  errors: Partial<Record<keyof T, string>>;
}

export class FormStateManager<T extends Record<string, any>> {
  private initialState: T;
  private setState: React.Dispatch<React.SetStateAction<FormState<T>>>;
  private state: FormState<T>;

  constructor(initialState: T, state: FormState<T>, setState: React.Dispatch<React.SetStateAction<FormState<T>>>) {
    this.initialState = initialState;
    this.state = state;
    this.setState = setState;
  }

  updateField(name: keyof T, value: any) {
    this.setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value
      },
      // Clear error for this field if it exists
      errors: {
        ...prev.errors,
        [name]: undefined
      }
    }));
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    this.updateField(name as keyof T, value);
  }

  setLoading(isLoading: boolean) {
    this.setState((prev) => ({
      ...prev,
      isLoading
    }));
  }

  setSaved(isSaved: boolean) {
    this.setState((prev) => ({
      ...prev,
      isSaved
    }));
  }

  resetForm() {
    this.setState((prev) => ({
      ...prev,
      formData: { ...this.initialState },
      errors: {}
    }));
  }

  setErrors(errors: Partial<Record<keyof T, string>>) {
    this.setState((prev) => ({
      ...prev,
      errors
    }));
  }

  validate(validationRules: Record<keyof T, (value: any) => string | null>): boolean {
    const errors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const field in validationRules) {
      const error = validationRules[field](this.state.formData[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    }

    this.setErrors(errors);
    return isValid;
  }
}

export const useFormState = <T extends Record<string, any>>(initialData: T) => {
  const [state, setState] = useState<FormState<T>>({
    formData: initialData,
    isSaved: false,
    isLoading: false,
    errors: {}
  });

  const formManager = new FormStateManager<T>(initialData, state, setState);

  return {
    state,
    formManager
  };
};
