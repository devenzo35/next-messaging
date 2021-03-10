import { ChangeEvent, useState } from "react";

export const useForm = <T extends Object> (initialState: T) => {
  
  
  const [formValue, setValue] = useState<T>(initialState);
  
  const reset=()=>{
    
    setValue(initialState)
    
  };
  
  const handleOnChange = ({ target }:ChangeEvent<HTMLInputElement> | any) => {
    setValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  return {formValue, handleOnChange,reset};
};