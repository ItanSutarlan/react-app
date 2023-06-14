import { useState } from "react";


const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    if (Array.isArray(formData[e.target.name])) {
      const array = formData[e.target.name]
      if (e.target.value.length === 0) {
        array.pop();
      } else {
        array[e.target.id] = e.target.value;
      }
      setFormData({ ...formData, [e.target.name]: array })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })      
    }
  }

  const addItem = (name) => {
    const field = formData[name]
    if (Array.isArray(field) && (field.length === 0 || (field.at(-1).length > 0))) {
       field.push("")
       setFormData({...formData, [name]: field })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key] = formData[key].filter(data => data.length > 0);
      }
    }
    onSubmit?.(formData);
  }

  return { formData, handleInputChange, handleSubmit, addItem, setFormData };
}

export default useForm