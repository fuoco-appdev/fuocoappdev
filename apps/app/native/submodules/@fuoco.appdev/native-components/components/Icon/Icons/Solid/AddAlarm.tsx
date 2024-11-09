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
      d="M7.88 3.39 6.6 1.86 2 5.71l1.29 1.53 4.59-3.85ZM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72ZM3 13a9 9 0 1 1 9 9c-4.98 0-9-4.03-9-9Zm9 7c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7Zm-1-8V9h2v3h3v2h-3v3h-2v-3H8v-2h3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
