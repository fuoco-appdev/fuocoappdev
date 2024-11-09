import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.5 9.55h2.8l-2.8 3.4v1.8h5v-1.8h-2.8l2.8-3.4v-1.8h-5v1.8Zm8.5 6.2v-5c0-3.07-1.63-5.64-4.5-6.32v-.68c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.11 6 7.67 6 10.75v5l-2 2v1h16v-1l-2-2Zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6Zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2Z" />
  </Svg>
)

export default Icon
