type FormValueType = {
  id?: number
  title?: string
  description?: string
  status?: string
  priority?: string
  assignee?: string
  tags?: string
  createdAt?: string
  updatedAt?: string
}

function TaskCard({
  task,
  handleOnClick,
}: {
  task: FormValueType
  handleOnClick?: React.MouseEventHandler<HTMLDivElement>
}) {
  return (
    <div
      onClick={handleOnClick}
      className="border border-gray-300 rounded-lg p-4 grid lg:grid-cols-12"
    >
      <p className="lg:col-span-12">{task.title}</p>
      <p className="lg:col-span-8">{task.assignee}</p>
      <p className="lg:col-span-4">{task.status}</p>
      <p className="lg:col-span-8">{task.priority}</p>
      <p className="lg:col-span-4">Tags</p>
    </div>
  )
}

export default TaskCard
