import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 12.72V9.5L13 7V5.5h2v-2h-2v-2h-2v2H9v2h2V7L6 9.5v3.22L2 14.5v8h9v-4c0-.55.45-1 1-1s1 .45 1 1v4h9v-8l-4-1.78Zm2 7.78h-5v-2.04c0-1.69-1.35-3.06-3-3.06s-3 1.37-3 3.06v2.04H4v-4.79l4-1.81v-3.35l4-2.05 4 2.04v3.35l4 1.81v4.8Z" />
    <Path d="M12 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </Svg>
)

export default Icon
