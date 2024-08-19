import { Button, Card, Group, PasswordInput, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import styles from '@/components/Input/input.module.css';
import useUserSetting from '@/hooks/useUserSetting';

export default function Page() {
    const { form, onSubmit } = useUserSetting()

    return (
        <form onSubmit={onSubmit}>
            <Card w={372} mx={"auto"}>
                <SimpleGrid cols={1}>
                    <Card.Section inheritPadding>
                        <Group align="center" justify="center">
                            <Text size={'26px'} lh={'39px'} c={'dark.9'} fw={'500'}>
                                User Info
                            </Text>
                        </Group>
                    </Card.Section>
                    <TextInput
                        label="UserName"
                        placeholder="Enter your username"
                        classNames={{ input: styles.input, error: styles['input__error-message'] }}
                        {...form.getInputProps('nickName')}
                    />
                    
                    <Button type="submit" variant="filled" radius={'sm'} h={40} size="14px" fullWidth>
                        Update
                    </Button>
                </SimpleGrid>
            </Card>
        </form>
    );
}
