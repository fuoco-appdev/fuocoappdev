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
      d="M4 12a9 9 0 1 1 9 9c-2.49 0-4.73-1.01-6.36-2.64l1.42-1.42A6.943 6.943 0 0 0 13 19c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7h3l-4 3.99L1 12h3Zm8 1V8h1.5v4.15l3.52 2.09-.77 1.28L12 13Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
