import styled from 'styled-components';

// const Textinput = styled.textinput`
//   padding: 1rem;
// `;

function TextInputWithLabel({ elementId, labelText, onChange, value, ref }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
