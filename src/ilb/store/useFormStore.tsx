import { create } from "zustand";
interface FormStoreProps {
  globalSelectedList: string[];
  setGlobalSelectedList: (payload: string[]) => void;
}

/* interface RemoveItemParams {
  removeItem: string;
  array: string[];
} */
/* const removeItem = ({ removeItem, array }: RemoveItemParams) => {
  return array.filter((val) => val !== removeItem);
}; */

export const useFormStore = create<FormStoreProps>((set) => ({
  globalSelectedList: [],
  setGlobalSelectedList: (payload: string[]) =>
    set(() => ({ globalSelectedList: [...payload] })),
}));
