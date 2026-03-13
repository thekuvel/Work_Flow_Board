function TaskCard() {
  return (
    <div className="border border-gray-300 rounded-lg p-4 grid grid-cols-12">
      <p className="col-span-12">Title</p>
      <p className="col-span-8">Asignee</p>
      <p className="col-span-4">Priority</p>
      <p className="col-span-8">Relative time</p>
      <p className="col-span-4">Tags</p>
    </div>
  )
}

export default TaskCard
