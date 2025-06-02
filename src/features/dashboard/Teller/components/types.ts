export interface BasePopupProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  initialData: T | null;
}

export interface ICardFormData {
  title: string;
  group: string;
  image: string | File;
}

export interface ICardData extends ICardFormData {
  _id?: string;        
  imageUrl?: string;      
}

export interface ISuggestData {
  _id?: string;
  id?: string;
  step: string;
  time: string;
  title: string;
  content: string;
  suggest: string;
}

export interface AddEditCardFormProps extends BasePopupProps<ICardFormData> {
  table: 'times' | 'majors' | 'technologies' | 'impacts';
}

export interface AddEditSuggestFormProps extends BasePopupProps<ISuggestData> {}