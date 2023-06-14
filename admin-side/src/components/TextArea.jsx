import PropTypes from 'prop-types';

function TextArea({ id, label, name, value, setValue }) {
  return (
    <div className="form-control">
      <label className="label text-lg" htmlFor={id}>{label}</label>
      <textarea className="textarea textarea-bordered h-24" id={id} placeholder={label} name={name} value={value} onChange={setValue} ></textarea>
    </div>
  )
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
}

export default TextArea;
