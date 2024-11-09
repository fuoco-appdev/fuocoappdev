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
      d="m11.95 3-8.88 8.88v2.83L14.78 3h-2.83Zm7.63.08L3.15 19.51c.09.34.27.65.51.9.25.24.56.42.9.51L21 4.49c-.19-.69-.73-1.23-1.42-1.41ZM3.07 5c0-1.1.9-2 2-2h2l-4 4V5Zm16 16c.55 0 1.05-.22 1.41-.59.37-.36.59-.86.59-1.41v-2l-4 4h2Zm-6.88 0H9.36L21.07 9.29v2.83L12.19 21Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
