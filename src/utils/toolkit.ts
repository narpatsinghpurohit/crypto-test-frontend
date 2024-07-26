import { toast } from "react-toastify";
import { InputField } from "../types/global";

export const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
        error: !re.test(String(email).toLowerCase()),
        errorText: "Invalid email address",
    };
};

export const validatePassword = (password: string) => {
    if (password.length < 6) {
        return { error: true, errorText: "Password must be at least 6 characters long" };
    } else {
        return { error: false, errorText: "" };
    }
};

export const handleValidation = (field: InputField) => {
  let error = false;
  let errorText = "";
  const value = field.value;
  const name = field.name;
  if (
    `${value}`.trim().length === 0
  ) {
    error = true;
    errorText = `${name} is required`;
  } else {
    switch (name) {
      case "email":
        const validation = validateEmail(`${value}`);
        error = validation.error;
        errorText = validation.errorText;
        break;
      case "password":
        const passwordValidation = validatePassword(`${value}`);
        error = passwordValidation.error;
        errorText = passwordValidation.errorText;
        break;
    }
  }
  return { error, errorText };
};

export const hasError = (inputFields: Record<string, InputField>) => {
  let error = false;
  for (const field in inputFields) {
    const validation = handleValidation(inputFields[field]);
    if (!error) {
      error = validation.error;
    }
  }
  return error;
}

export const handleApiErrors = (error:any) => {
  if(error.response){
    toast.error(error.response.data.message)
  }else{
    toast.error("Something went wrong!!!")
  }
}