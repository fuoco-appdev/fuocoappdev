import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11.82 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <Path d="M15.71 8.11C15.32 7.72 14.65 7 13.35 7h-2.54c-2.75-.01-4.99-2.25-4.99-5h-2c0 3.16 2.11 5.84 5 6.71V22h2v-6h2v6h2V10.05L18.77 14l1.41-1.41-4.47-4.48Z" />
  </Svg>
)

export default Icon