export interface BasePopupProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  initialData: T | null;
}

export interface ICardData {
  _id?: string;
  id?: string;
  title: string;
  group: string;
  image: File | string; // File chỉ sử dụng form, api trả về string
}

export interface ISuggestData {
  _id?: string;
  id?: string;
  step: string;
  time: string;
  title: string;
  content: string;
  suggest: string;
  emoji?: string;
}

export interface AddEditCardFormProps extends BasePopupProps<ICardData> {
  table: 'times' | 'majors' | 'technologies' | 'impacts';
}

export interface AddEditSuggestFormProps extends BasePopupProps<ISuggestData> {
}