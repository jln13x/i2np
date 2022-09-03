import { useNavigation } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
// https://lottiefiles.com/80561-smooth-gears-ignite-animation
import animaton from '../text-to-page.animation.json';
import { Feature } from './Feature';

export const TextToPageFeature = () => {
  const { navigate } = useNavigation();

  const handleNavigate = () => {
    navigate('UploadImage');
  };

  return (
    <Feature
      title="Text to page"
      description="Detect text in any image and uploads it to Notion as a page"
      icon={<AnimatedLottieView source={animaton} autoPlay={true} loop={true} speed={0.25}/>}
      onPress={handleNavigate}
    />
  );
};
