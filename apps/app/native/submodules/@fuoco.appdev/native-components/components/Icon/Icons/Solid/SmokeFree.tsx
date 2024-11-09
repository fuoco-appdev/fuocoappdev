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
      d="M16.03 8.65H14.5a3.35 3.35 0 0 1 0-6.7v1.5c-1.02 0-1.85.73-1.85 1.75s.83 2 1.85 2h1.53c1.87 0 3.47 1.35 3.47 3.16V12H18v-1.3c0-1.31-.92-2.05-1.97-2.05ZM14.66 13H17v2.34L14.66 13Zm4.19-8.27c.62-.61 1-1.45 1-2.38h-1.5c0 1.02-.83 1.85-1.85 1.85v1.5c2.24 0 4 1.83 4 4.07V12H22V9.76c0-2.22-1.28-4.14-3.15-5.03ZM19.5 13H18v3h1.5v-3Zm1 0H22v3h-1.5v-3ZM9 13 2 6l1.41-1.41 17 17L19 23l-7-7H2v-3h7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
