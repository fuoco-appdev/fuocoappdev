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
      d="M18.85 7.73c.62-.61 1-1.45 1-2.38C19.85 3.5 18.35 2 16.5 2v1.5c1.02 0 1.85.83 1.85 1.85S17.52 7.2 16.5 7.2v1.5c2.24 0 4 1.83 4 4.07V15H22v-2.24c0-2.22-1.28-4.14-3.15-5.03ZM2 16h15v3H2v-3Zm18.5 0H22v3h-1.5v-3Zm-1 0H18v3h1.5v-3Zm-5-5.8h1.53c1.87 0 3.47 1.35 3.47 3.16V15H18v-1.3c0-1.31-.92-2.05-1.97-2.05H14.5a3.35 3.35 0 0 1 0-6.7v1.5c-1.02 0-1.85.73-1.85 1.75s.83 2 1.85 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
