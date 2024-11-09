import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15.715 7.7h4v4h-1v2c0 .34-.08.66-.23.94l-1.77-1.77V11.7h-1v-4Zm-4 .17 2 2V5.7h2l-3-4-3 4h2v2.17Zm2 7.83v2.28c.6.34 1 .98 1 1.72 0 1.1-.9 2-2 2s-2-.9-2-2c0-.74.4-1.37 1-1.72V15.7h-3c-1.11 0-2-.89-2-2v-2.28c-.6-.34-1-.98-1-1.72 0-.59.26-1.13.68-1.49l-4.29-4.29 1.41-1.41 18.38 18.38-1.41 1.41-6.6-6.6h-.17Zm-2-2v-.17l-2.51-2.51c-.14.16-.31.29-.49.4v2.28h3Z" />
  </Svg>
)

export default Icon
