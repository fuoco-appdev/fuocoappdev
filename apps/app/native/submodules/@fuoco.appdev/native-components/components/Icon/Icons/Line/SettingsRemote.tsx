import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15.005 9.5h-6c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-12c0-.55-.45-1-1-1Zm-1 12h-4v-10h4v10Z" />
    <Path d="M12.005 14.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="m7.055 6.55 1.41 1.41a5.022 5.022 0 0 1 7.08 0l1.41-1.41a6.976 6.976 0 0 0-4.95-2.05c-1.93 0-3.68.78-4.95 2.05ZM12.005.5c-3.04 0-5.79 1.23-7.78 3.22l1.41 1.41a9.011 9.011 0 0 1 6.37-2.63c2.49 0 4.74 1.01 6.36 2.64l1.41-1.41c-1.98-2-4.73-3.23-7.77-3.23Z" />
  </Svg>
)

export default Icon
