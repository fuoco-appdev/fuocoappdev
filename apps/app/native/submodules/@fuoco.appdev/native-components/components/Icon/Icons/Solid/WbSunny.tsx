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
      d="M11 .55h2V3.5h-2V.55ZM6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41ZM4 10.5H1v2h3v-2Zm16.45-6.04-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79Zm-1.42 15.5-1.79-1.8 1.4-1.4 1.8 1.79-1.41 1.41ZM23 10.5h-3v2h3v-2Zm-17 1c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6Zm7 10.95V19.5h-2v2.95h2Zm-8.04-2.5-1.41-1.41 1.79-1.8 1.41 1.41-1.79 1.8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
