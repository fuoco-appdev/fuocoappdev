import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.488 14.538v-9.04c0-1.1-.9-2-2-2H4.498c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10.05c.28 1.92 2.1 3.35 4.18 2.93 1.34-.27 2.43-1.37 2.7-2.71.25-1.24-.16-2.39-.94-3.18Zm-2-9.04-6.99 3.5-7-3.5h13.99Zm-3.64 10H4.498v-8l7 3.5 7-3.5v6.05c-.16-.02-.33-.05-.5-.05-1.39 0-2.59.82-3.15 2Zm5.15 2h-4v-1h4v1Z" />
  </Svg>
)

export default Icon
