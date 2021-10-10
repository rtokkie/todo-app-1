import { FormControl, Input } from '@chakra-ui/react'
import { VFC } from 'react'
import { useForm } from 'react-hook-form'

type Values = {
  content: string
}

export type TodoCreateFormProps = {
  onSubmit: (values: Values) => Promise<void>
}

export const TodoCreateForm: VFC<TodoCreateFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit: handleSubmitHookForm, reset } = useForm()

  const handleSubmit = async (values: Values) => {
    await onSubmit(values)
    reset()
  }

  return (
    <form onSubmit={handleSubmitHookForm(handleSubmit)}>
      <FormControl>
        <Input required {...register('content')} />
      </FormControl>
    </form>
  )
}
