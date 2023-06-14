/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

function LabeledInput({ id, label, name, inputType, value, setValue }) {

  return (
    Array.isArray(value) ? (
      <div className='mt-2 mb-2'>
        <label
          className='text-lg'
          htmlFor={id}>{label}
          {value.map((tagVal, i) => (
            <input
              id={i}
              key={i}
              type={inputType}
              name={name}
              className="input input-sm input-bordered input-accent w-full mt-2"
              value={tagVal}
              onChange={setValue}
            />
          ))}
        </label>
      </div>
    ) : (
      <div>
        <label
          className="label text-lg"
          htmlFor={id}>{label}</label>
        <input
          id={id}
          type={inputType}
          name={name}
          className="input input-sm input-bordered input-accent w-full"
          value={value}
          onChange={setValue} />
      </div>
    )
  )
}

LabeledInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default LabeledInput;
