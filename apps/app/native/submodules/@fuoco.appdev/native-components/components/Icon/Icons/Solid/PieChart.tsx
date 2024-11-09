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
      d="M11 22c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10v20Zm2.03-20v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99Zm0 20v-8.99H22c-.47 4.74-4.23 8.52-8.97 8.99Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
