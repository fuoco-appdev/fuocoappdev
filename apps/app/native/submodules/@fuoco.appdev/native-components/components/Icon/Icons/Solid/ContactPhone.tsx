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
      d="M2 3h20c1.1 0 2 .9 2 2l-.01 14c0 1.1-.89 2-1.99 2H2c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm9 6c0-1.66-1.34-3-3-3S5 7.34 5 9s1.34 3 3 3 3-1.34 3-3Zm-9 9v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H2Zm17.49-4h-1.64c-.22-.63-.35-1.3-.35-2s.13-1.37.35-2h1.64L21 8l-1.99-1.99A7.474 7.474 0 0 0 16.28 10c-.18.64-.28 1.31-.28 2s.1 1.36.28 2a7.512 7.512 0 0 0 2.73 3.99L21 16l-1.51-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
