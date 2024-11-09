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
      d="M11.416.038c.21-.02.413-.038.634-.038C18.34 0 23.49 4.84 24 11h-1.5c-.36-3.76-2.7-6.93-5.97-8.48L15.2 3.85 11.39.04l.026-.002ZM1.5 13c.36 3.76 2.7 6.93 5.97 8.49l1.33-1.34 3.81 3.82c-.073.003-.146.008-.218.012-.144.01-.289.018-.442.018C5.66 24 .51 19.16 0 13h1.5ZM16 14h2V8a2 2 0 0 0-2-2h-6v2h6v6ZM8 4v12h12v2h-2v2h-2v-2H8a2 2 0 0 1-2-2V8H4V6h2V4h2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon