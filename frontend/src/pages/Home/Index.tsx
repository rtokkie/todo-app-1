import { Container, Stack, Text } from '@chakra-ui/react'
import { VFC } from 'react'

import { TodoCreateForm } from './TodoCreateForm'

const Index: VFC = () => {
  return (
    <Container>
      <Stack>
        <Text fontSize="2xl" fontWeight="bold">
          TodoApp
        </Text>
        <TodoCreateForm
          onSubmit={(v) => {
            console.log(v)
            return Promise.resolve()
          }}
        />
      </Stack>
    </Container>
  )
}

export default Index
