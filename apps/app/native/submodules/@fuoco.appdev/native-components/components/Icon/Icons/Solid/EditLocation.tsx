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
      d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7ZM9.95 12.49H8.51v-1.44l3.93-3.92 1.43 1.43-3.92 3.93Zm4.64-4.64.7-.7a.38.38 0 0 0 0-.54l-.9-.9a.38.38 0 0 0-.54 0l-.7.7 1.44 1.44Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
