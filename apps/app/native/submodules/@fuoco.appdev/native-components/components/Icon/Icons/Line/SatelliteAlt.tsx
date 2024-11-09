import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.503 14.501h2a9 9 0 0 1-9 9v-2c3.87 0 7-3.13 7-7Zm-7 3v2c2.76 0 5-2.24 5-5h-2c0 1.66-1.34 3-3 3Zm4.26-16.41 3.54 3.54c.78.78.78 2.05 0 2.83l-3.18 3.18c-.78.78-2.05.78-2.83 0l-1.24-1.24-.71.7 1.24 1.24c.78.78.78 2.05 0 2.83l-1.41 1.41c-.78.78-2.05.78-2.83 0l-1.24-1.24-.71.71 1.24 1.24c.78.78.78 2.05 0 2.83l-3.18 3.18c-.78.78-2.05.78-2.83 0l-3.54-3.54c-.78-.78-.78-2.05 0-2.83l3.18-3.18c.78-.78 2.05-.78 2.83 0l1.24 1.24.71-.71-1.24-1.23c-.78-.78-.78-2.05 0-2.83l1.42-1.42c.78-.78 2.05-.78 2.83 0l1.24 1.24.71-.71-1.25-1.23c-.78-.78-.78-2.05 0-2.83l3.18-3.18c.79-.79 2.05-.79 2.83 0Zm-15.2 15.2-1.06 1.06 3.54 3.54 1.06-1.06-3.54-3.54Zm2.12-2.12-1.06 1.06 3.54 3.54 1.06-1.06-3.54-3.54Zm4.95-4.95-1.41 1.41 3.54 3.54 1.41-1.41-3.54-3.54Zm4.6-4.6-1.06 1.06 3.54 3.54 1.06-1.06-3.54-3.54Zm2.12-2.12-1.06 1.06 3.54 3.54 1.06-1.06-3.54-3.54Z" />
  </Svg>
)

export default Icon