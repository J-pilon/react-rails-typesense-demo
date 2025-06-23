import { useState } from 'react'

export default function TaskForm({ initialTask = {}, onSubmit }) {
  const [ taskDetails, setTaskDetails ] = useState(initialTask || {
    name: '',
    description: ''
  })

  const submitHandler = (e) => {
    e.preventDefault()
    onSubmit(taskDetails)
  }

  return (
    <>
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', border: "1px solid black", borderRadius: 12, height: 300, width: 400, padding: 16, gap: 12 }}>
        <input 
          placeholder='Enter a Title' 
          value={taskDetails['name']} 
          onChange={e => setTaskDetails({ ...taskDetails, name: e.target.value })} 
          style={{ width: 'fit' }}
          />
        <textarea 
          placeholder='Enter a description.' 
          cols={4}
          value={taskDetails['description']} 
          onChange={e => setTaskDetails({ ...taskDetails, description: e.target.value })} 
          style={{ width: 'fit', flex: 1 }}
          />
        <button 
          type="submit"
          style={{ width: '100%' }}
        >
          Save
        </button>
      </form>
    </>
  )
}