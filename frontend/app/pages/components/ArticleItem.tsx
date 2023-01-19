import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'

export const ArticleItem = () => {
  return (
    <Card className='lg:w-[300px]' shadow='sm' p='lg' radius='md' withBorder>
      <Card.Section>
        <Image
          src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
          alt='Norway'
          width={300}
          height={160}
        />
      </Card.Section>

      <Group position='apart' mt='md' mb='xs'>
        <Text weight={500}>Norway Fjord Adventures</Text>
        <Badge color='pink' variant='light'>
          On Sale
        </Badge>
      </Group>

      <Text size='sm' color='dimmed'>
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>

      <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
        Book classic tour now
      </Button>
    </Card>
  )
}