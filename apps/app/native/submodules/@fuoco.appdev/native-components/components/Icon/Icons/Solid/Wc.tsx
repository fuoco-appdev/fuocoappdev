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
      d="M7.2 6c1.065 0 1.92-.89 1.92-2 0-1.11-.854-2-1.92-2-1.066 0-1.92.89-1.92 2 0 1.11.854 2 1.92 2Zm-1.92 8.5V22h3.84v-7.5h1.44V9c0-1.1-.864-2-1.92-2H5.76c-1.056 0-1.92.9-1.92 2v5.5h1.44Zm12 1.5v6H14.4v-6h-2.88l2.438-7.63c.26-.82.999-1.37 1.824-1.37h.116c.825 0 1.555.55 1.824 1.37L20.16 16h-2.88Zm.48-12c0 1.11-.854 2-1.92 2-1.066 0-1.92-.89-1.92-2 0-1.11.854-2 1.92-2 1.066 0 1.92.89 1.92 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
