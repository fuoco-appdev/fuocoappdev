import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m22 5.8-4.6-3.9-1.3 1.5 4.6 3.9L22 5.8ZM7.9 3.5 6.6 2 2 5.8l1.3 1.5 4.6-3.8Zm4.6 4.6H11v6l4.7 2.9.8-1.2-4-2.4V8.1Zm-.5-4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9Zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7Z" />
  </Svg>
)

export default Icon
