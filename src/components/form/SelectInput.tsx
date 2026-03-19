type SelectInputProps = {
  label: string
  id?: string
  optionValue: string[]
  optionLabel: string[]
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  value?: string
}

export default function SelectInput(selectInput: SelectInputProps) {
  return (
    <div className="flex gap-2">
      <label htmlFor={selectInput.id}>{selectInput.label}</label>
      <select
        id={selectInput.id}
        className="text-gray-500"
        onChange={selectInput.onChange}
        value={selectInput.value}
      >
        <option value="">Select</option>
        {selectInput.optionLabel.map((label, index) => (
          <option key={label} value={selectInput.optionValue[index]}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
