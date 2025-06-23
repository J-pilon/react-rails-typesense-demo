import { useQuery } from '@tanstack/react-query'
import { fetchTasks, updateTask } from '../api/tasks'
import { Link } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/tasks';
import TaskForm from '../components/TaskForm';

export default function TasksIndex() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks })
  
  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks'])
  })
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks'])
  })

  if (isPending) return <p>Loading Tasks...</p>
  if (isError) return <p>Error: {error.message}</p>

  const handleCheckboxChange = (task) => {
    updateMutation.mutate({ ...task, completed: !task.completed })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 16 }}>
      <TaskForm onSubmit={createMutation.mutate} />
      <div>
        <h2>Tasks</h2>
        <ul style={{ listStyleType: 'none' }}>
          {data.map(task => 
            <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input 
                type="checkbox"
                checked={task.completed} 
                onChange={() => handleCheckboxChange(task)}
              />
              <Link to={`/tasks/${task.id}`}>{task.name}</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}