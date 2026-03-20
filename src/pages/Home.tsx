import type React from 'react'
import TaskCard from '../components/TaskCard.tsx'
import Button from '../components/Button.tsx'
import TextInput from '../components/form/TextInput.tsx'
import { startTransition, useEffect, useState } from 'react'
import { getAllTask } from '../lib/idb.ts'
import FormModal from '../components/FormModal.tsx'
import SelectInput from '../components/form/SelectInput.tsx'
import { useSearchParams } from 'react-router-dom'

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
  sort?: string
  // sortOrder: 'asc' | 'desc'
}

function Home() {
  const [tasks, setTasks] = useState<FormValueType[]>([{}])
  const [filteredTasks, setFilteredTasks] = useState<FormValueType[]>()
  const [selectedTask, setSelectedTask] = useState<FormValueType>()
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const [formType, setFormType] = useState<string>('')

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterSort, setFilterSort] = useState<FilterSortType>({
    search: searchParams.get('search') || '',
    priority: searchParams.get('priority') || '',
    sort: searchParams.get('sort') || '',
    status: searchParams.get('status')?.split(','),
  })

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

  function updateUrlParams(newFilters: FilterSortType) {
    const params: Record<string, string> = {}

    if (newFilters.search) params.search = newFilters.search
    if (newFilters.priority) params.priority = newFilters.priority
    if (newFilters.sort) params.sort = newFilters.sort
    if (newFilters.status) {
      const statusArray = Array.isArray(newFilters.status)
        ? newFilters.status
        : [newFilters.status]
      if (statusArray.length > 0) {
        params.status = statusArray.join(',')
      }
    }

    setSearchParams(params)
  }

  const performSearch = () => {
    console.log(filterSort)
    updateUrlParams(filterSort)

    const priorityOrder: Record<string, number> = {
      low: 1,
      medium: 2,
      high: 3,
    }

    const filteredTask = tasks
      .filter((task) =>
        (task.title || '')
          .toLowerCase()
          .includes((filterSort.search || '').toLowerCase())
      )
      .filter((task) =>
        filterSort.status && filterSort.status.length > 0
          ? filterSort.status.includes(task.status || '')
          : true
      )
      .filter((task) =>
        filterSort.priority ? task.priority === filterSort.priority : true
      )
      .sort((a, b) => {
        switch (filterSort.sort) {
          case 'createdDateAsc':
            return (
              new Date(a.createdAt || 0).getTime() -
              new Date(b.createdAt || 0).getTime()
            )
          case 'createdDateDesc':
            return (
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
            )
          case 'updatedDateAsc':
            return (
              new Date(a.updatedAt || 0).getTime() -
              new Date(b.updatedAt || 0).getTime()
            )
          case 'updatedDateDesc':
            return (
              new Date(b.updatedAt || 0).getTime() -
              new Date(a.updatedAt || 0).getTime()
            )
          case 'priorityAsc':
            return (
              (priorityOrder[a.priority || 'low'] || 0) -
              (priorityOrder[b.priority || 'low'] || 0)
            )
          case 'priorityDesc':
            return (
              (priorityOrder[b.priority || 'low'] || 0) -
              (priorityOrder[a.priority || 'low'] || 0)
            )
          default:
            return 0
        }
      })

    console.log(filteredTask)
    setFilteredTasks(filteredTask)
  }

  function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    performSearch()
  }

  function handleClearSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setSearchParams()
    setFilterSort({})
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
      <div className="my-2 grid gap-2 md:justify-end justify-center items-center">
        <TextInput
          gridOrFlex="flex gap-2"
          label="Search:"
          id="search"
          placeholder="Task title or description"
          onChange={handleFilterSortChange}
          value={filterSort.search || ''}
        />
        <SelectInput
          label="Status:"
          id="status"
          optionLabel={['Backlog', 'In Progress', 'Done']}
          optionValue={['backlog', 'inProgress', 'done']}
          onChange={handleFilterSortChange}
          multiple={true}
          value={filterSort.status || []}
        />
        <SelectInput
          label="Priority:"
          id="priority"
          optionLabel={['Low', 'Medium', 'High']}
          optionValue={['low', 'medium', 'high']}
          onChange={handleFilterSortChange}
          value={filterSort.priority || ''}
        />
        <SelectInput
          label="Sort:"
          id="sort"
          optionLabel={[
            'Created date ascending',
            'Created date descending',
            'Updated date ascending',
            'Updated date desscending',
            'Priority ascending',
            'Priority desscending',
          ]}
          optionValue={[
            'createdDateAsc',
            'createdDateDesc',
            'updatedDateAsc',
            'updatedDateDesc',
            'priorityAsc',
            'priorityDesc',
          ]}
          onChange={handleFilterSortChange}
          value={filterSort.sort || ''}
        />
        <Button
          label="Search"
          borderColor="border border-blue-500"
          onClick={handleSearch}
        />
        <Button
          label="Clear search"
          borderColor="border border-blue-500"
          onClick={handleClearSearch}
        />
        <Button
          label="Create New Task"
          bgColor="bg-blue-500"
          textColor="text-white"
          onClick={onClickNewTask}
        />
      </div>

      {/* Borad view */}
      <div className="grid lg:grid-cols-3">
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
