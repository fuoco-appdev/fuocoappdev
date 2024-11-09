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
      d="m18.22 2.27-2.1 2.1C17.86 5.64 19 7.68 19 10v1H5v-1c0-2.32 1.14-4.36 2.88-5.63l-2.1-2.1.82-.83 2.31 2.31C9.84 3.28 10.88 3 12 3c1.12 0 2.16.28 3.1.75l2.3-2.31.82.83ZM12 23c-3.87 0-7-3.13-7-7v-4h14v4c0 3.87-3.13 7-7 7ZM9 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm5-1c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
