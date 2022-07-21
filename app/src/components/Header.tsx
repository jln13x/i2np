import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'native-base';
import React from 'react';
import { Avatar } from './Avatar';
import { BrandLogo } from './BrandLogo';
import { Container } from './Container';

export const Header = () => {
  const { navigate } = useNavigation();
  const handleNavigateProfile = () => navigate('Profile');
  const handleNavigateHome = () => navigate('Home');

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDir="row"
      safeArea={true}
      py={4}
    >
      <Pressable onPress={handleNavigateHome}>
        <BrandLogo size="small" />
      </Pressable>
      <Pressable onPress={handleNavigateProfile}>
        <Avatar letter="J" />
      </Pressable>
    </Container>
  );
};
