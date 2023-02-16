import { Button, Group } from '@mantine/core'

type SubmitBtnType = {
  label: string
}

export const SubmitBtn = ({ label }: SubmitBtnType) => {
  return (
    <Group mt={60}>
      <Button
        type="submit"
        className="bg-admin-base font-normal leading-none text-common-black"
      >
        {label}
      </Button>
    </Group>
  )
}
