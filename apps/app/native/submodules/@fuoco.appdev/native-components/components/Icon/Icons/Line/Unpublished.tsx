import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m8.245 4.815-1.45-1.46a9.91 9.91 0 0 1 5.51-1.66c5.52 0 10 4.48 10 10 0 2.04-.61 3.93-1.66 5.51l-1.46-1.46a7.869 7.869 0 0 0 1.12-4.05c0-4.41-3.59-8-8-8-1.48 0-2.86.41-4.06 1.12Zm9.72 4.41-1.41-1.41-2.65 2.65 1.41 1.41 2.65-2.65Zm2.12 13.08-2.27-2.27a9.91 9.91 0 0 1-5.51 1.66c-5.52 0-10-4.48-10-10 0-2.04.61-3.93 1.66-5.51l-2.27-2.27 1.41-1.41 18.38 18.38-1.4 1.42Zm-3.72-3.73-3.88-3.88-1.59 1.59-4.24-4.24 1.41-1.41 2.83 2.83.18-.18-5.65-5.65a7.932 7.932 0 0 0-1.12 4.06c0 4.41 3.59 8 8 8 1.48 0 2.86-.41 4.06-1.12Z" />
  </Svg>
)

export default Icon
