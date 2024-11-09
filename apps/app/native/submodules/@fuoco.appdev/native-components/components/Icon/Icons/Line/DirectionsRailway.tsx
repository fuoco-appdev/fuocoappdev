import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2c-4.42 0-8 .5-8 4v10.5C4 18.43 5.57 20 7.5 20L6 21.5v.5h12v-.5L16.5 20c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4Zm0 2c6 0 6 1.2 6 2H6c0-.8 0-2 6-2Zm6 4v3H6V8h12Zm-1.5 10h-9c-.83 0-1.5-.67-1.5-1.5V13h12v3.5c0 .83-.67 1.5-1.5 1.5ZM12 13.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" />
  </Svg>
)

export default Icon
