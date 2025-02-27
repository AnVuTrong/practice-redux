import { ChangeEvent, useState } from 'react';

export class FormManager<T extends Record<string, any>, E extends Record<string, string>> {
  private validators: Map<keyof T, (value: any) => string>;
  private setState: React.Dispatch<React.SetStateAction<T>>;
  private setErrors: React.Dispatch<React.SetStateAction<E>>;
  private state: T;
  private errors: E;
  
  constructor(
    initialState: T, 
    initialErrors: E,
    setState: React.Dispatch<React.SetStateAction<T>>,
    setErrors: React.Dispatch<React.SetStateAction<E>>
  ) {
    this.state = initialState;
    this.errors = initialErrors;
    this.validators = new Map();
    this.setState = setState;
    this.setErrors = setErrors;
  }

  public addValidator<K extends keyof T>(field: K, validator: (value: T[K]) => string): void {
    this.validators.set(field, validator);
  }

  public handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    this.updateField(name as keyof T, value as any);
  }

  public updateField<K extends keyof T>(field: K, value: T[K]): void {
    // Update internal state
    this.state = { ...this.state, [field]: value };
    
    // Update React state
    this.setState((prevState) => ({ ...prevState, [field]: value }));
    
    // Clear field error when user updates a field
    if ((this.errors as any)[field]) {
      this.errors = { ...this.errors, [field]: '' };
      this.setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    }
  }

  public validate(): boolean {
    let isValid = true;
    const newErrors = { ...this.errors };

    // Convert to array to avoid iterator issues
    const validatorEntries = Array.from(this.validators.entries());
    
    for (const [field, validator] of validatorEntries) {
      const error = validator(this.state[field as keyof T]);
      (newErrors as any)[field] = error;
      
      if (error) {
        isValid = false;
      }
    }

    this.errors = newErrors;
    this.setErrors(newErrors);
    return isValid;
  }

  public getState(): T {
    return this.state;
  }

  public getErrors(): E {
    return this.errors;
  }
}

export function useFormManager<
  T extends Record<string, any>,
  E extends Record<string, string>
>(initialState: T, initialErrors: E) {
  const [formData, setFormData] = useState<T>(initialState);
  const [formErrors, setFormErrors] = useState<E>(initialErrors);
  
  const [formManager] = useState(() => 
    new FormManager<T, E>(initialState, initialErrors, setFormData, setFormErrors)
  );
  
  return {
    formData,
    formErrors,
    formManager
  };
} 