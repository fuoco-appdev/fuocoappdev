import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11.305 21.75c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2Zm0-15.5c2.49 0 4 2.02 4 4.5v.1l2 2v-2.1c0-3.07-1.63-5.64-4.5-6.32v-.68c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.24.06-.47.15-.69.23l1.64 1.64c.18-.02.36-.05.55-.05ZM4.715 3.1l-1.41 1.41 2.81 2.81c-.52 1-.81 2.17-.81 3.43v5l-2 2v1h14.24l1.74 1.74 1.41-1.41L4.715 3.1Zm10.59 13.65h-8v-6c0-.68.12-1.32.34-1.9l7.66 7.66v.24Z" />
  </Svg>
)

export default Icon
