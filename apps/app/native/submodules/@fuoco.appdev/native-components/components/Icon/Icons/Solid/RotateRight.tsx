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
      d="m11 1 4.55 4.55L11 10V6.09C8.16 6.57 6 9.03 6 12s2.16 5.43 5 5.91v2.02c-3.95-.49-7-3.85-7-7.93s3.06-7.44 7-7.93V1Zm7.31 6.11c.9 1.16 1.45 2.5 1.62 3.89h-2.02c-.14-.87-.48-1.72-1.02-2.47l1.42-1.42ZM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03Zm5.31-1.01-1.42-1.41c.54-.76.88-1.61 1.02-2.48h2.02a7.908 7.908 0 0 1-1.62 3.89Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
