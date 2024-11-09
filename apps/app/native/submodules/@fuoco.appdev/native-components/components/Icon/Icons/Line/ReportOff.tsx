import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.39 4.71h5.8l4.1 4.1v5.8l-.22.22 1.42 1.41.8-.8V7.98l-5.27-5.27H8.56l-.8.8 1.41 1.42.22-.22Z" />
    <Path d="M12.29 16.71a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M13.29 9.04V6.71h-2v.33l2 2ZM2.7 1.29 1.29 2.7l3.64 3.64-1.64 1.64v7.46l5.27 5.27h7.46l1.64-1.64 3.64 3.64 1.41-1.41L2.7 1.29Zm12.49 17.42h-5.8l-4.1-4.1v-5.8l1.05-1.05 9.9 9.9-1.05 1.05Z" />
  </Svg>
)

export default Icon
