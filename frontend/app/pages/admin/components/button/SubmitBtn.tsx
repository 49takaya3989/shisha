import { Button, Group } from '@mantine/core'

type SubmitBtnType = {
  label: string
}

export const SubmitBtn = ({ label }: SubmitBtnType) => {
  return (
    <Group mt={60}>
      <Button
        type='submit'
        className='bg-admin-base text-common-black leading-none font-normal'
      >
        {label}
      </Button>
    </Group>
  )
}
