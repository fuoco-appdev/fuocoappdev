import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M2 13C2 7.48 6.48 3 12 3s10 4.48 10 10c0 3.7-2.01 6.92-5 8.65l-1-1.73c2.39-1.39 4-3.96 4-6.92 0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.96 1.61 5.53 3.99 6.92l-1 1.73C4.01 19.92 2 16.7 2 13Zm16 0c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19Zm-6-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
