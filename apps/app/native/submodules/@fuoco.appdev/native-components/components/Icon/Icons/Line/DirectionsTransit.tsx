import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2.5c-4 0-8 .5-8 4V16c0 1.93 1.57 3.5 3.5 3.5L6 21v.5h12V21l-1.5-1.5c1.93 0 3.5-1.57 3.5-3.5V6.5c0-3.5-3.58-4-8-4Zm5.66 3H6.43c.61-.52 2.06-1 5.57-1 3.71 0 5.12.46 5.66 1ZM11 7.5v3H6v-3h5Zm2 0h5v3h-5v-3Zm3.5 10h-9c-.83 0-1.5-.67-1.5-1.5v-3.5h12V16c0 .83-.67 1.5-1.5 1.5Z" />
    <Path d="M8.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M15.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </Svg>
)

export default Icon
