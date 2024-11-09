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
      d="M18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.201.05-.395.122-.582.19l-.002.001-.106.039L18 13.1V11Zm-6 11c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2ZM6.81 7.57 4 4.76l1.41-1.41 15.98 15.98-1.41 1.41L18.24 19H4v-1l2-2v-5c0-1.27.29-2.43.81-3.43Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
