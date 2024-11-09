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
      d="M18 6.54a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM15 17h-2c0 1.65-1.35 3-3 3s-3-1.35-3-3 1.35-3 3-3v-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5Zm1.14-3.5H18c1.1 0 2 .9 2 2V21h-2v-5h-4.98c-1.46 0-2.45-1.57-1.85-2.9L13 9h-2.21l-.65 1.53L8.22 10l.67-1.8C9.22 7.47 9.95 7 10.76 7h5.2c1.48 0 2.46 1.5 1.85 2.83l-1.67 3.67Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
