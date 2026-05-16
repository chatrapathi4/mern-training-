import React from 'react'
import Service from '../../utils/http';
import { useState, useEffect } from 'react';
import { Container, Stack, Avatar, Text, Loader} from '@mantine/core';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getName, getUserAvatar } from '../../redux/slices/User';

export default function ProfilePage() {
    const service = new Service();
    const name = useSelector(getName);
    const avatar = useSelector(getUserAvatar);
    const email = useSelector((state) => state.user.email);
    const isLoggedIn = useSelector(getIsLoggedIn);

    const [user, setUser] = useState({ name, email, avatar });
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const response = await service.get('user/profile');
            const profile = response?.data ?? response;
            setUser((prev) => ({ ...prev, ...profile }));
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(
        () => {
            if (!isLoggedIn) {
                setLoading(false);
                return;
            }
            fetchUser();
        },
        [isLoggedIn]
    );

    if (loading) {
        return <Loader color="violet" size="xl" type="dots" />;
    }

    if (!user) {
        return <div>Error loading user profile.</div>;
    }


    return (
        <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
            </Stack>
        </Container>
    )
}


