import type React from 'react'
import TaskCard from '../components/TaskCard.tsx'
import Button from '../components/Button.tsx'
import TextInput from '../components/form/TextInput.tsx'
import SelectInput from '../components/form/SelectInput.tsx'
import TextAreaInput from '../components/form/TextAreaInput.tsx'
import { useState } from 'react'

function Home() {
  type FormValueType = {
    title?: string
  }

  const [formValue, setFormValue] = useState<FormValueType>({ title: '' })

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setFormValue({ ...formValue, [e.target.id]: e.target.value })
  }

  function onClickNewTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log(formValue)
  }

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

      <div className="border rounded p-2">
        <form>
          <TextInput
            label="Title"
            placeholder="Task Title"
            id="title"
            value={formValue.title || ''}
            onChange={handleOnChange}
          />

          <TextAreaInput
            label="Description"
            id="description"
            placeholder="Task details"
            rowCount={2}
          />

          <SelectInput
            label="Status:"
            optionLabel={['Backlog', 'In Progress', 'Done']}
            optionValue={['backlog', 'inProgress', 'done']}
          />

          <SelectInput
            label="Priority:"
            optionLabel={['Low', 'Medium', 'High']}
            optionValue={['low', 'medium', 'high']}
          />

          <TextInput
            label="Assignee"
            placeholder="Assign to"
            id="assignee"
            onChange={handleOnChange}
          />

          <div className="flex gap-2">
            <Button
              label="Save"
              bgColor="bg-green-500"
              textColor="text-white"
              onClick={onClickNewTask}
            />
            <Button
              label="Update"
              bgColor="bg-orange-500"
              textColor="text-white"
              // onClick={onClickNewTask}
            />
            <Button
              label="Delete"
              bgColor="bg-red-500"
              textColor="text-white"
              // onClick={onClickNewTask}
            />
            <Button
              label="Cancel"
              textColor="text-red-500"
              borderColor="border border-red-500"
              // onClick={onClickNewTask}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
