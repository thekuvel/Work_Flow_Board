import type React from 'react'
import TaskCard from '../components/TaskCard.tsx'
import Button from '../components/Button.tsx'
import TextInput from '../components/form/TextInput.tsx'
import { startTransition, useEffect, useState } from 'react'
import { getAllTask } from '../lib/idb.ts'
import FormModal from '../components/FormModal.tsx'
import SelectInput from '../components/form/SelectInput.tsx'
// import { useSearchParams } from 'react-router-dom'

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

type FilterSortType = {
  search?: string
  status?: string | string[]
  priority?: string
  // sortBy: 'createdAt' | 'updatedAt' | 'priority'
  // sortOrder: 'asc' | 'desc'
}

function Home() {
  const [tasks, setTasks] = useState<FormValueType[]>([{}])
  const [filteredTasks, setFilteredTasks] = useState<FormValueType[]>()
  const [selectedTask, setSelectedTask] = useState<FormValueType>()
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const [formType, setFormType] = useState<string>('')
  // const [searchParams, setSearchParams] = useSearchParams()
  const [filterSort, setFilterSort] = useState<FilterSortType>({})

  function handleFilterSortChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { id } = e.target

    let value: string | string[]

    if (e.target instanceof HTMLSelectElement && e.target.multiple) {
      value = Array.from(e.target.selectedOptions, (option) => option.value)
    } else {
      value = e.target.value
    }
    setFilterSort({ ...filterSort, [id]: value })
  }

  function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log(filterSort)

    const filteredTask = tasks
      .filter((task) =>
        task.title
          ?.toLowerCase()
          .includes((filterSort.search || '').toLowerCase())
      )
      .filter((task) =>
        task.status && filterSort.status
          ? filterSort.status.includes(task.status)
          : true
      )
      .filter((task) =>
        filterSort.priority ? task.priority == filterSort.priority : true
      )
    console.log(filteredTask)
    setFilteredTasks(filteredTask)
  }

  function onClickNewTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setSelectedTask({})
    setDisplayForm(true)
    setFormType('newForm')
  }

  const loadTask = async () => {
    const res = await getAllTask()
    startTransition(() => {
      setTasks(res)
    })
  }

  useEffect(() => {
    loadTask()
  }, [])

  return (
    <div>
      {/* Search and filter */}
      <div className="my-2 flex gap-2 justify-end items-center">
        <TextInput
          gridOrFlex="flex gap-2"
          label="Search:"
          id="search"
          placeholder="Task title or description"
          onChange={handleFilterSortChange}
        />
        <SelectInput
          label="Status:"
          id="status"
          optionLabel={['Backlog', 'In Progress', 'Done']}
          optionValue={['backlog', 'inProgress', 'done']}
          onChange={handleFilterSortChange}
          multiple={true}
        />
        <SelectInput
          label="Priority:"
          id="priority"
          optionLabel={['Low', 'Medium', 'High']}
          optionValue={['low', 'medium', 'high']}
          onChange={handleFilterSortChange}
        />
        <Button
          label="Search"
          borderColor="border border-blue-500"
          onClick={handleSearch}
        />
        <Button
          label="New Task"
          bgColor="bg-blue-500"
          textColor="text-white"
          onClick={onClickNewTask}
        />
      </div>

      {/* Borad view */}
      <div className="grid grid-cols-3">
        <div className="p-2">
          <h2 className="mb-10 text-center border-b border-b-gray-300">
            Backlog
          </h2>
          {/* <TaskCard /> */}
          {(filteredTasks || tasks).map(
            (task, i) =>
              task.status == 'backlog' && (
                <TaskCard
                  key={i}
                  task={task}
                  handleOnClick={() => {
                    setSelectedTask(task)
                    setDisplayForm(true)
                    setFormType('updateForm')
                  }}
                />
              )
          )}
        </div>
        <div className="p-2">
          <h2 className="mb-10 text-center border-b border-b-gray-300">
            In Progress
          </h2>
          {(filteredTasks || tasks).map(
            (task, i) =>
              task.status == 'inProgress' && (
                <TaskCard
                  key={i}
                  task={task}
                  handleOnClick={() => {
                    setSelectedTask(task)
                    setDisplayForm(true)
                    setFormType('updateForm')
                  }}
                />
              )
          )}
        </div>
        <div className="p-2">
          <h2 className="mb-10 text-center border-b border-b-gray-300">Done</h2>
          {(filteredTasks || tasks).map(
            (task, i) =>
              task.status == 'done' && (
                <TaskCard
                  key={i}
                  task={task}
                  handleOnClick={() => {
                    setSelectedTask(task)
                    setDisplayForm(true)
                    setFormType('updateForm')
                  }}
                />
              )
          )}
        </div>
      </div>

      {/* Form */}
      {displayForm && (
        <FormModal
          task={selectedTask}
          loadTask={loadTask}
          setDisplayForm={() => setDisplayForm(false)}
          formType={formType}
        />
      )}
    </div>
  )
}

export default Home
