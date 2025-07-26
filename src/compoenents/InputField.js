import React from "react";
import { motion } from "framer-motion";

const shakeAnimation = {
  initial: { x: 0 },
  animate: {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.5 },
  },
};

export default function InputField({
  field,
  register,
  errors,
  onNext,
  showNext = false,
  isLast = false,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && showNext && onNext) {
      e.preventDefault(); // prevent form submit
      onNext(field.name);
    }
  };

  return (
    <motion.div
      key={field.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="mb-3">
      <label className="form-label">{field.label}</label>

      {field.name === "mobile" ? (
        <motion.input
          style={{ color: "#07314a", fontSize: "14px" }}
          type="text"
          inputMode="numeric"
          maxLength={10}
          className="form-control"
          {...register("mobile")}
          onInput={(e) => {
            let value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length === 1 && !/[6-9]/.test(value)) {
              value = "";
            }
            e.target.value = value.slice(0, 10);
          }}
          pattern="[6-9][0-9]{9}"
          variants={shakeAnimation}
          animate={errors.mobile ? "animate" : ""}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <motion.input
          style={{ color: "#07314a", fontSize: "14px" }}
          type={field.type}
          className="form-control"
          {...register(field.name)}
          variants={shakeAnimation}
          animate={errors[field.name] ? "animate" : ""}
          onKeyDown={handleKeyDown}
        />
      )}

      {errors[field.name] && (
        <div className="form-text text-danger">
          {errors[field.name]?.message}
        </div>
      )}

      {showNext && (
        <button
          type="button"
          className="next-btn mt-4 w-100"
          onClick={() => onNext(field.name)}>
          Next
        </button>
      )}

      {isLast && (
        <button type="submit" className="btn btn-success w-100 mt-4">
          Submit
        </button>
      )}
    </motion.div>
  );
}
