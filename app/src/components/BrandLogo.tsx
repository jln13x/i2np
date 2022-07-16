import { Image } from 'native-base';
// @ts-ignore
import brand from '../../assets/brand.png';

interface BrandLogoProps {
  size?: 'small' | 'large';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'large' }) => {
  const sizes =
    size === 'large' ? { width: 200, height: 200 } : { width: 50, height: 50 };

  return <Image source={brand} alt="Brand" resizeMode="contain" {...sizes} />;
};
