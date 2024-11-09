import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.705 13.345v-8c0-1.76 2.24-4 5-4v16.17l-2-2v-2.17h-3Zm4.49 9.31-10.47-10.46c-.33.09-.66.15-1.02.15v9h-2v-9c-2.21 0-4-1.79-4-4v-3.17l-2.31-2.32 1.41-1.41 19.8 19.8-1.41 1.41ZM6.875 8.345l-1.17-1.17v1.17h1.17Zm2.83-7h-2v2.17l2 2v-4.17Zm4 7v-7h-2v6.17l1.85 1.85c.09-.33.15-.66.15-1.02Z" />
  </Svg>
)

export default Icon
