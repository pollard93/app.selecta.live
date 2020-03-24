import { PickerItemProps, TextInputProps, SwitchProps, PickerProps } from 'react-native';
import Form from './Form';

export interface InitialConfigParams {
  type: string;
  name: any;
  required: boolean;
  value?: any;
  placeholder?: string;
  textInputProps?: TextInputProps;
  switchProps?: SwitchProps;
  pickerProps?: PickerProps;
  disabled?: boolean;
  options?: PickerItemProps[];
  resolve?: (value: any) => any;
  onError?: (errors) => any;
  onChange?: (value) => any;
  valid?: boolean;
  touched?: boolean;
  changed?: boolean;
  pattern?: RegExp | {test: (v: any) => boolean};
}

export interface ConfigParams extends InitialConfigParams {
  originalValue: any;
  originalValid: boolean;
  touched: boolean;
  changed: boolean;
}

export interface InitialConfig {
  [any :string]: InitialConfigParams | InitialConfig[];
}

export interface Config {
  [any :string]: ConfigParams | Config[];
}

export interface Fields {
  [any :string]: JSX.Element | Fields[];
}

export interface FormChildren<T> {
  config: Config;
  fields: Fields;
  valid: boolean;
  triggerSubmit: (e, ...any: any[]) => any;
  updateConfigArray: (key: string, removeIndex: number, insertData: InitialConfig) => void;
  form: Form<T>;
}

export interface FormProps<T> {
  config: InitialConfig;
  onSubmit: (variables: T, Form: Form<T>, args?: any) => void;
  reduceVariables?: (config: Config, Form: Form<T>) => T;
  validateForm?: (config: Config, Form: Form<T>) => boolean;
  onChange?: (variables: T, Form: Form<T>, args?: any) => void;
  children?: (args: FormChildren<T>) => JSX.Element;
}

export interface FormState {
  config: Config;
  valid: boolean;
}
