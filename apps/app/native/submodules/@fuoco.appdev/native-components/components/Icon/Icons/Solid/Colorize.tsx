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
      d="m18.37 3.29 2.34 2.34c.39.39.39 1.02-.01 1.42l-3.12 3.12 1.92 1.92-1.41 1.41-1.42-1.42L7.75 21H3v-4.75l8.92-8.92-1.42-1.42 1.41-1.41 1.93 1.91 3.12-3.12a.996.996 0 0 1 1.41 0ZM5 17.08 6.92 19l8.06-8.06-1.92-1.92L5 17.08Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
