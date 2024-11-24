export interface ComboboxProps {
  items: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  type: string;
  lng: string;
  width?: string;
}
