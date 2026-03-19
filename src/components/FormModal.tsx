import React, { startTransition, useEffect, useState } from 'react'
import Button from './Button'
import SelectInput from './form/SelectInput'
import TextAreaInput from './form/TextAreaInput'
import TextInput from './form/TextInput'
import { addTask, deleteTask, updateTask } from '../lib/idb'

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

function FormModal({
  task,
  loadTask,
  setDisplayForm,
}: {
  task?: FormValueType
  loadTask: () => void
  setDisplayForm: () => void
}) {
  const [formValue, setFormValue] = useState<FormValueType>(
    task || {
      title: '',
      description: '',
      status: '',
      priority: '',
      assignee: '',
      tags: '',
      createdAt: '',
      updatedAt: '',
    }
  )

  function handleOnChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    e.preventDefault()
    setFormValue({ ...formValue, [e.target.id]: e.target.value })
  }

  function resetForm() {
    setFormValue({
      title: '',
      description: '',
      status: '',
      priority: '',
      assignee: '',
      tags: '',
      createdAt: '',
      updatedAt: '',
    })
  }

  async function onClickSaveTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setFormValue({ ...formValue, createdAt: Date().split('GMT')[0] })
    const res = await addTask(formValue)
    if (res) {
      console.log('Task saved')
      resetForm()
      loadTask()
    } else {
      console.log('Some thing went wrong')
    }
  }

  async function onClickUpdateTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setFormValue({ ...formValue, updatedAt: Date().split('GMT')[0] })
    const res = await updateTask(formValue)
    console.log(res)
    resetForm()
    loadTask()
  }

  async function onClickDeleteTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (formValue.id) {
      await deleteTask(formValue.id)
      resetForm()
      loadTask()
    } else {
      console.log('No item selected to delete')
    }
  }

  function onClickCancelTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    resetForm()
    setDisplayForm()
  }

  useEffect(() => {
    startTransition(() => {
      if (task) {
        setFormValue(task)
      }
    })
  }, [task])

  return (
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
          value={formValue.description || ''}
          onChange={handleOnChange}
        />

        <SelectInput
          label="Status:"
          id="status"
          optionLabel={['Backlog', 'In Progress', 'Done']}
          optionValue={['backlog', 'inProgress', 'done']}
          onChange={handleOnChange}
          value={formValue.status || ''}
        />

        <SelectInput
          label="Priority:"
          id="priority"
          optionLabel={['Low', 'Medium', 'High']}
          optionValue={['low', 'medium', 'high']}
          onChange={handleOnChange}
          value={formValue.priority || ''}
        />

        <TextInput
          label="Assignee"
          placeholder="Assign to"
          id="assignee"
          onChange={handleOnChange}
          value={formValue.assignee || ''}
        />

        <div className="flex gap-2">
          <Button
            label="Save"
            bgColor="bg-green-500"
            textColor="text-white"
            onClick={onClickSaveTask}
          />
          <Button
            label="Update"
            bgColor="bg-orange-500"
            textColor="text-white"
            onClick={onClickUpdateTask}
          />
          <Button
            label="Delete"
            bgColor="bg-red-500"
            textColor="text-white"
            onClick={onClickDeleteTask}
          />
          <Button
            label="Cancel"
            textColor="text-red-500"
            borderColor="border border-red-500"
            onClick={onClickCancelTask}
          />
        </div>
      </form>
    </div>
  )
}

export default FormModal
