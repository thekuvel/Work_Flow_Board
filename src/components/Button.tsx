type ButtonProps = {
  label: string
  bgColor?: string
  textColor?: string
  borderColor?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
function Button(button: ButtonProps) {
  return (
    <button
      className={`p-2 min-w-[100px] ${button.borderColor} ${button.textColor} ${button.bgColor} rounded `}
      type="button"
      onClick={button.onClick}
    >
      {button.label}
    </button>
  )
}

export default Button
