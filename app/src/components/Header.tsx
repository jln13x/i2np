import { useUser } from '@/features/user/queries/use-user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, IconButton, Pressable } from 'native-base';
import { Avatar } from './Avatar';
import { BrandLogo } from './BrandLogo';
import { Container } from './Container';

export const Header = () => {
  const { navigate, canGoBack, goBack } = useNavigation();
  const handleNavigateProfile = () => navigate('Profile');
  const handleNavigateHome = () => navigate('Home');
  const { name, person } = useUser();


  const canNavigateBack = canGoBack();

  return (
    <Container safeArea={true} py={4}>
      <HStack justifyContent="space-between">
        <IconButton
          colorScheme="indigo"
          alignSelf="flex-start"
          onPress={goBack}
          icon={<Icon as={MaterialCommunityIcons} name="chevron-left" />}
          isDisabled={!canNavigateBack}
          disabled={!canNavigateBack}
        />
        <Pressable onPress={handleNavigateHome}>
          <BrandLogo size="small" />
        </Pressable>
        <Pressable onPress={handleNavigateProfile}>
          <Avatar letter={name?.charAt(0) || person.email.charAt(0)} />
        </Pressable>
      </HStack>
    </Container>
  );
};
