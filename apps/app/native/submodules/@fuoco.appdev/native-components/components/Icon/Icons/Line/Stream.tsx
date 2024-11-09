import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <Path d="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <Path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <Path d="M18.348 4.227 13.942 8.62l1.412 1.416 4.405-4.392-1.413-1.416Z" />
    <Path d="m8.32 9.68.31.32 1.42-1.41-4.02-4.04h-.01l-.31-.32-1.42 1.41 4.02 4.05.01-.01Z" />
    <Path d="M15.41 13.94 14 15.35l3.99 4.01.35.35 1.42-1.41-3.99-4.01-.36-.35Z" />
    <Path d="m8.59 13.95-4.03 4.01-.32.33 1.41 1.41 4.03-4.02.33-.32-1.42-1.41Z" />
    <Path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </Svg>
)

export default Icon
