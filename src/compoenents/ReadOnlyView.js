import React from "react";

export default function ReadOnlyView({ values, fields, onEdit }) {
  return (
    <>
      {fields.map((field) => (
        <div className="mb-3" key={field.name}>
          <strong>{field.label}:</strong>{" "}
          <span className="ms-2 read-only-data" style={{ color: "#07314a" }}>
            {values[field.name]}
          </span>
        </div>
      ))}
      <button className="btn btn-warning w-100" onClick={onEdit}>
        Edit
      </button>
    </>
  );
}
