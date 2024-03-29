import Svg, { G, Path } from 'react-native-svg';

interface NotionIconProps {
  pathColor?: 'white' | 'black';
}

export const NotionIcon: React.FC<NotionIconProps> = ({
  pathColor = 'black',
}) => {
  return (
    <Svg
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      width={20}
      height={20}
    >
      {/* @ts-ignore */}
      <G>
        <Path
          fill={pathColor}
          d="M95.2,89.8c15.8,12.9,21.8,12,51.7,10l281.9-16.9c6,0,1-6-1-7L381,42c-8.9-7-20.9-14.9-43.8-13L64.3,49
       c-10,0.9-12,5.9-8,9.9L95.2,89.8z M112.1,155.5v296.6c0,15.9,7.9,21.9,25.8,20.9l309.8-17.9c17.9-1,20-11.9,20-24.9V135.6
       c0-13-5-19.9-16-18.9L128,135.6C116,136.6,112.1,142.5,112.1,155.5L112.1,155.5z M417.9,171.3c2,9,0,17.9-9,19l-14.9,3v218.9
       c-13,7-24.9,11-34.8,11c-16,0-20-5-31.9-19.9L229.6,250v148.3l30.9,7c0,0,0,17.9-24.9,17.9l-68.7,4c-2-4,0-14,7-15.9l17.9-5V210.3
       l-24.9-2c-2-9,3-21.9,16.9-22.9l73.7-5l101.7,155.3V198.3l-25.9-3c-2-10.9,5.9-18.9,15.9-19.8L417.9,171.3z M41.3,22.1L325.3,1.2
       c34.8-3,43.8-1,65.7,14.9l90.7,63.7c14.9,10.9,19.9,13.9,19.9,25.8v349.4c0,21.9-8,34.8-35.8,36.8l-329.8,19.9
       c-20.8,1-30.8-2-41.8-15.9l-66.7-86.7c-11.9-15.9-16.9-27.8-16.9-41.7V56.9C10.4,39,18.4,24.1,41.3,22.1L41.3,22.1z"
        />
      </G>
    </Svg>
  );
};
