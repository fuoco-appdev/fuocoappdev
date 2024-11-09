import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 1.5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2Zm0 16h-4.83L12 19.67 9.83 17.5H5v-14h14v14Zm-7-7c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3Zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Zm6 8.58c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58v1.42h12v-1.42Zm-9.52-.58c.74-.51 2.23-1 3.52-1s2.78.49 3.52 1H8.48Z" />
  </Svg>
)

export default Icon
