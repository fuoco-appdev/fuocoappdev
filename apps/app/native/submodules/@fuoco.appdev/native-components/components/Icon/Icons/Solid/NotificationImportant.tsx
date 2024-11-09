import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="m19 17 2 2v1H3v-1l2-2v-6c0-3.35 2.36-6.15 5.5-6.83V3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v1.17C16.64 4.85 19 7.65 19 11v6Zm-5.01 4.01c0 1.1-.89 1.99-1.99 1.99s-1.99-.89-1.99-1.99h3.98ZM11 16v-2h2v2h-2Zm0-8v4h2V8h-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
