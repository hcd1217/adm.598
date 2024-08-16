import { Group, Image } from '@mantine/core';
import logoSrc from "@/assets/logo/logo-light-horizontal.svg";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Group justify='start' pl={"md"}>
            <Link to={'/'}>
                <Image w={180} radius="md" src={logoSrc} />
            </Link>
        </Group>
    );
}
