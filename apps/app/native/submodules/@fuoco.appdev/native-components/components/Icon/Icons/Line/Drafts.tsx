import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.99 9.5c0-.72-.37-1.35-.94-1.7L12 2.5 2.95 7.8c-.57.35-.95.98-.95 1.7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10Zm-2 0v.01L12 14.5l-8-5 8-4.68 7.99 4.68ZM4 19.5v-7.66l8 5.02 7.99-4.99.01 7.63H4Z" />
  </Svg>
)

export default Icon
