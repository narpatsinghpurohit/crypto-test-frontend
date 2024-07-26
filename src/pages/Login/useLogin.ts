import { useState } from 'react';
import api from '../../utils/ApiCall';
import { InputField } from '../../types/global';
import { handleApiErrors, handleValidation, hasError } from '../../utils/toolkit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const defaultFormState: Record<string, InputField> = {
  email: {
    label: "Email *",
    value: "",
    name: "email",
    placeholder: "Enter Email",
    error: false,
    errorText: "",
    type: "email",
  },
  password: {
    label: "Password *",
    value: "",
    name: "password",
    placeholder: "Enter password",
    error: false,
    errorText: "",
    type: "password",
  },
}
const useLogin = () => {
  const [inputFields, setInputFields] = useState<Record<string, InputField>>(defaultFormState);

  const auth = useAuth();

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    let value = event.target.value;
    setInputFields((prev) => {
      const {error, errorText} = handleValidation({ ...prev[name], value });
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error,
          errorText
        },
      }
    });
  };

  const handleLogin = () => {
    if (!hasError(inputFields)) {
      api.post('/auth/login', { email:inputFields.email.value, password:inputFields.password.value })
      .then((response) => {
        auth?.login(response.data.data, response.data.token)
      })
      .catch((error) => {
          handleApiErrors(error)
      });
    }else{
      toast.error("Invalid inputs")
    }
  }

  return {
    inputFields,
    onInputChange,
    handleLogin,
  };
};

export default useLogin;