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
  function calculateTime(lastUpdatedTime?: string) {
    if (!lastUpdatedTime) return ''
    if (lastUpdatedTime) {
      const updatedDate = new Date(lastUpdatedTime)
      const now = new Date()
      const diffMs = now.getTime() - updatedDate.getTime()

      const diffHours = diffMs / (1000 * 60 * 60)
      const diffDays = diffMs / (1000 * 60 * 60 * 24)

      if (diffHours < 24) {
        return `${Math.floor(diffHours)} hour(s) ago`
      } else {
        return `${Math.floor(diffDays)} day(s) ago`
      }
    }
  }

  return (
    <div
      onClick={handleOnClick}
      className="mt-2 border border-gray-300 rounded-lg p-4 grid lg:grid-cols-12"
    >
      <p className="lg:col-span-12 font-medium">{task.title}</p>
      <p className="lg:col-span-8">{task.assignee || 'Set assignee'}</p>
      <p className="lg:col-span-4">Status: {task.status}</p>
      <p className="lg:col-span-8">Priority: {task.priority}</p>
      <p className="lg:col-span-4">
        {calculateTime(task.updatedAt || task.createdAt)}
      </p>
    </div>
  )
}

export default TaskCard
