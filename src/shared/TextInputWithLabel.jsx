<<<<<<< Updated upstream
function TextInputWithLabel({ elementId, label, onChange, inputRef, value }) {
=======
import { forwardRef } from 'react';

const TextInputWithLabel = forwardRef(function TextInputWithLabel(
  { elementId, labelText, onChange, value },
  ref
) {
>>>>>>> Stashed changes
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
});

export default TextInputWithLabel;
