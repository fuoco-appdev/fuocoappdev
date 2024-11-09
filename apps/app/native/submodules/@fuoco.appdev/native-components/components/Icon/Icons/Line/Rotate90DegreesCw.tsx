import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M1.5 13.5a9 9 0 0 0 13.79 7.62l-1.46-1.46c-.99.53-2.13.84-3.33.84-3.86 0-7-3.14-7-7s3.14-7 7-7h.17L9.09 8.09 10.5 9.5l4-4-4-4-1.42 1.41 1.59 1.59h-.17a9 9 0 0 0-9 9Zm9 0 6 6 6-6-6-6-6 6Zm6 3.17-3.17-3.17 3.17-3.17 3.17 3.17-3.17 3.17Z" />
  </Svg>
)

export default Icon
