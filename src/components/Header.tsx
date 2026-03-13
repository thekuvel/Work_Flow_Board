function Header() {
  return (
    <div className="py-5 border-b flex justify-between">
      <h1>Work Flow Board</h1>
      <p>{Date().toString().split('GMT')[0]}</p>
    </div>
  )
}

export default Header
