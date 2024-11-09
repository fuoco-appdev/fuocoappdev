import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.25 15.5 9.75 8l-7.5 7.5 1.41 1.41 1.09-1.08v4.67h10v-4.67l1.09 1.09 1.41-1.42Zm-4.5 3h-2v-3h-2v3h-2v-4.67l3-3 3 3v4.67Zm9-10.5h-1.19l.75.75-.71.71L19.14 8h-.89v.89l1.45 1.45-.71.71-.74-.74v1.19h-1v-1.19l-.75.75-.71-.71 1.45-1.45V8h-.89L14.9 9.45l-.71-.71.75-.75h-1.19v-1h1.19l-.75-.75.71-.71 1.45 1.45h.89v-.87l-1.45-1.45.71-.71.75.75V3.5h1v1.19l.75-.75.71.71-1.46 1.46V7h.89l1.45-1.45.71.71-.74.74h1.19v1Z" />
  </Svg>
)

export default Icon
