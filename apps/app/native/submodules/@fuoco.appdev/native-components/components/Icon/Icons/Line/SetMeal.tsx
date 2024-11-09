import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m21.05 18.07-17.97.94-.08-1.5 17.98-.94.07 1.5ZM21 19.99H3v1.5h18v-1.5Zm2-6.48v-9c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2Zm-2 0H3v-9h18v9Zm-1-7c-1.68 0-3.04.98-3.21 2.23-.64-.73-2.73-2.73-6.54-2.73-4.67 0-6.75 3-6.75 3s2.08 3 6.75 3c3.81 0 5.9-2 6.54-2.73.17 1.25 1.53 2.23 3.21 2.23v-5Z" />
  </Svg>
)

export default Icon
