import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2.5c-4 0-8 .5-8 4V16c0 1.93 1.57 3.5 3.5 3.5l-1.5 1v1h12v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6.5c0-3.5-3.58-4-8-4Zm0 2c3.71 0 5.13.46 5.67 1H6.43c.6-.52 2.05-1 5.57-1ZM18 16c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5v-3.5h12V16Zm0-5.5H6v-3h12v3Z" />
    <Path d="M12 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </Svg>
)

export default Icon
