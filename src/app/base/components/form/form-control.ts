import { ToolButton } from '../tool-button/tool-button';

export interface FormControl {
  id: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  label?: string;
  placeholder?: string;
  value?: any;
  colSpan?: number;
  selectOptions?: any[];
  isMulti?: boolean;
  readonly?: boolean;
  allowClear?: boolean;
  toolButton?: ToolButton;
  minWidth?: string;
  onChange?: (value: any) => void;
}
