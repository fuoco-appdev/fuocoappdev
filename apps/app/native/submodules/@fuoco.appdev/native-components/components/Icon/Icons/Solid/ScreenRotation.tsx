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
      d="M22.45 11c-.36-3.76-2.7-6.93-5.97-8.48l-1.33 1.32L11.34.03 12 0c6.29 0 11.44 4.84 11.95 11h-1.5ZM8.11 1.75a1.49 1.49 0 0 1 2.12 0l12.02 12.02c.59.58.59 1.53 0 2.12l-6.36 6.36c-.58.59-1.53.59-2.12 0L1.75 10.23a1.49 1.49 0 0 1 0-2.12l6.36-6.36Zm6.72 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36ZM1.55 13c.36 3.76 2.7 6.94 5.97 8.48l1.33-1.32 3.81 3.81L12 24C5.71 24 .56 19.16.05 13h1.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
