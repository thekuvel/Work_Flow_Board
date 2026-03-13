import TaskCard from '../components/TaskCard.tsx'

function Home() {
  // function onClickNewTask(e) {
  //   e.preventDefault()
  //   console.log('Clicked')
  // }
  return (
    <div>
      {/* Search and filter */}
      <div className="my-2 flex gap-20 justify-end items-center">
        <p>Search tasks</p>
        <p>Filter</p>
        <button
          // onClick={onClickNewTask}
          className="p-2 rounded bg-blue-500 text-white"
        >
          New Task
        </button>
      </div>

      {/* Borad view */}
      <div className="grid grid-cols-3">
        <div className="p-2">
          <h2 className="mb-10 text-center border-b border-b-gray-300">
            Backlog
          </h2>
          <TaskCard />
        </div>
        <div className="p-2">
          <h2 className="mb-10 text-center border-b border-b-gray-300">
            In Progress
          </h2>
        </div>
        <div className="p-2">
          <h2 className="mb-10 text-center border-b border-b-gray-300">Done</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
