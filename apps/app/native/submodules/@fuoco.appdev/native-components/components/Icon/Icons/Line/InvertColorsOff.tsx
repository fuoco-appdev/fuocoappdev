import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.9 20.89 3.52 2.51 2.1 3.92l4.2 4.2a7.73 7.73 0 0 0-1.6 4.7c.01 4.36 3.59 7.88 8.01 7.88 1.75 0 3.36-.56 4.67-1.5l3.1 3.1 1.42-1.41Zm-9.19-2.19c-3.31 0-6-2.63-6-5.87 0-1.19.36-2.32 1.02-3.28l4.98 4.98v4.17ZM9.09 5.26l3.62-3.56 5.65 5.56c1.45 1.43 2.35 3.4 2.35 5.57 0 1.18-.27 2.29-.74 3.3l-7.26-7.26V4.51l-2.2 2.16-1.42-1.41Z" />
  </Svg>
)

export default Icon
