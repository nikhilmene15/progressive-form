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
  return (
    <motion.div
      key={field.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="mb-3">
      <label className="form-label">{field.label}</label>

      <motion.input
        style={{ color: "#07314a", fontSize: "14px" }}
        type={field.type}
        className="form-control"
        {...register(field.name)}
        variants={shakeAnimation}
        animate={errors[field.name] ? "animate" : ""}
      />

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
