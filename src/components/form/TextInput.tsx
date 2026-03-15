type TextInputProps = {
  label: string
  placeholder?: string
  id?: string
  gridOrFlex?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function TextInput(textInput: TextInputProps) {
  return (
    <div className={`${textInput.gridOrFlex ? textInput.gridOrFlex : 'grid'}`}>
      <label htmlFor={textInput.id}>{textInput.label}</label>
      <input
        id={textInput.id}
        type="text"
        placeholder={textInput.placeholder}
        value={textInput.value}
        onChange={textInput.onChange}
      />
    </div>
  )
}

export default TextInput
