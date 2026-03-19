import { openDB } from 'idb'

const DB_Name: string = 'TaskDB'
const Store_Name: string = 'TaskStore'

// Creating DB and Store for tasks
export const dbPromise = openDB(DB_Name, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(Store_Name)) {
      db.createObjectStore(Store_Name, {
        keyPath: 'id',
        autoIncrement: true,
      })
    }
  },
})

// CRUD operation
export const addTask = async (task: object) => {
  const db = await dbPromise
  return db.add(Store_Name, task)
}

export const getAllTask = async () => {
  const db = await dbPromise
  return db.getAll(Store_Name)
}

export const updateTask = async (task: object) => {
  const db = await dbPromise
  return db.put(Store_Name, task)
}

export const deleteTask = async (id: number) => {
  const db = await dbPromise
  return db.delete(Store_Name, id)
}
