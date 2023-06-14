import PropTypes from 'prop-types';

function LabeledSelect({ id, label, name, data, value, setValue }) {
  return (
    <div>
      <label
        className="label text-lg"
        htmlFor={id}>{label}</label>
      <select name={name} id={id} className="select select-accent w-full select-sm" value={value} onChange={setValue}>
        <option disabled value={0}>Choose {label}</option>
        {
          data.map(el => {
            return (
              <option key={el.id} value={el.id}>{el.name}</option>
            )
          })
        }
      </select>
    </div >
  )
}

LabeledSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default LabeledSelect;
