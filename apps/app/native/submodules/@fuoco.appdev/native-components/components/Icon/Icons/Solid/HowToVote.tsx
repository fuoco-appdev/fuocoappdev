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
      d="m6.39 8.66 6.37-6.37a.975.975 0 0 1 1.4.01l4.95 4.95c.39.39.39 1.02 0 1.41l-6.36 6.36a.996.996 0 0 1-1.41 0l-4.95-4.95a.996.996 0 0 1 0-1.41ZM17 7.95l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95ZM18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 0 0 2-2v-4l-3-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
