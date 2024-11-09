import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.5 6.27a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <Path d="M14.5 16.73h-2c0 1.65-1.35 3-3 3s-3-1.35-3-3 1.35-3 3-3v-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5Zm3-3.5h-1.86l1.67-3.67c.61-1.33-.37-2.83-1.85-2.83h-5.2c-.81 0-1.54.47-1.87 1.2l-.67 1.8 1.92.53.65-1.53h2.21l-1.83 4.1c-.6 1.33.39 2.9 1.85 2.9h4.98v5h2v-5.5c0-1.1-.9-2-2-2Z" />
  </Svg>
)

export default Icon
