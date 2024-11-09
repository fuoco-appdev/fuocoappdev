import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 12.5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm1.65 7.35L15.5 17.7v-3.2h1v2.79l1.85 1.85-.7.71ZM17 3.5h-3.18c-.42-1.16-1.52-2-2.82-2-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H5v-15h2v3h8v-3h2v5.08c.71.1 1.38.31 2 .6V5.5c0-1.1-.9-2-2-2Zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z" />
  </Svg>
)

export default Icon
