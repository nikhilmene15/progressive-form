import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import fields from "./fieldsData";
import validationSchema from "./validationSchema";
import InputField from "./InputField";
import ReadOnlyView from "./ReadOnlyView";

export default function ProgressiveForm() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState("progress");

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    defaultValues: Object.fromEntries(fields.map((f) => [f.name, ""])),
  });

  const values = watch();

  const handleNext = async (fieldName) => {
    const isValid = await trigger(fieldName);
    if (isValid) {
      setStep((prev) => prev + 1);
    } else {
      setValue(fieldName, "");
    }
  };

  const onSubmit = () => {
    toast.success("Form submitted successfully!");
    setMode("readOnly");
  };

  const handleEdit = () => setMode("edit");

  const handleSave = async () => {
    const isValid = await trigger();
    if (isValid) {
      toast.success("Changes saved!");
      setMode("readOnly");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 ">
      <Toaster />
      <div
        className="bg-white p-4 shadow rounded w-100"
        style={{ maxWidth: 600 }}>
        <h2 className="text-center mb-4">Registration Form</h2>

        {mode === "progress" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {fields.map((field, index) => {
                const shouldShow = index === step;
                return (
                  shouldShow && (
                    <InputField
                      key={field.name}
                      field={field}
                      register={register}
                      errors={errors}
                      onNext={handleNext}
                      showNext={index < fields.length - 1}
                      isLast={index === fields.length - 1}
                    />
                  )
                );
              })}
            </AnimatePresence>
          </form>
        )}

        {mode === "readOnly" && (
          <ReadOnlyView values={values} fields={fields} onEdit={handleEdit} />
        )}

        {mode === "edit" && (
          <form onSubmit={(e) => e.preventDefault()}>
            {fields.map((field) => (
              <InputField
                key={field.name}
                field={field}
                register={register}
                errors={errors}
                showNext={false}
              />
            ))}
            <button className="next-btn w-100 mt-3" onClick={handleSave}>
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
