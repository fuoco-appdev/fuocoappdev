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
      d="m6.663 1.905 1.282 1.536-4.608 3.844-1.281-1.536 4.607-3.844Zm10.674 0 4.607 3.844-1.281 1.536-4.608-3.843 1.282-1.536ZM3 13.096a9 9 0 1 1 18.001.001A9 9 0 0 1 3 13.095Zm9 7c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7Zm-1-8v-3h2v3h3v2h-3v3h-2v-3H8v-2h3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
