export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignInFormErrors extends Record<string, string> {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormErrors extends Record<string, string> {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthFormState<T, E> {
  formData: T;
  formErrors: E;
  isValid: boolean;
} 