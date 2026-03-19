import type React from 'react'
import TaskCard from '../components/TaskCard.tsx'
import Button from '../components/Button.tsx'
import TextInput from '../components/form/TextInput.tsx'
import { startTransition, useEffect, useState } from 'react'
import { getAllTask } from '../lib/idb.ts'
import FormModal from '../components/FormModal.tsx'

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

function Home() {
  const [tasks, setTasks] = useState<FormValueType[]>([{}])
  const [selectedTask, setSelectedTask] = useState<FormValueType>()
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const [formType, setFormType] = useState<string>('')

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
      <div className="my-2 flex gap-20 justify-end items-center">
        <TextInput
          gridOrFlex="flex gap-2"
          label="Search"
          placeholder="Task title or description"
        />
        <p>Filter</p>
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
          {tasks.map(
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
          {tasks.map(
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
          {tasks.map(
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
