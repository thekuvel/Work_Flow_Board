type TextAreaInputProps = {
  label: string
  id?: string
  placeholder?: string
  rowCount?: number
  colCount?: number
  value?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export default function TextAreaInput(textAreaInput: TextAreaInputProps) {
  return (
    <div className="grid">
      <label htmlFor={textAreaInput.id}>{textAreaInput.label}</label>
      <textarea
        id={textAreaInput.id}
        placeholder={textAreaInput.placeholder}
        rows={textAreaInput.rowCount}
        cols={textAreaInput.colCount}
        value={textAreaInput.value}
        onChange={textAreaInput.onChange}
      ></textarea>
    </div>
  )
}
