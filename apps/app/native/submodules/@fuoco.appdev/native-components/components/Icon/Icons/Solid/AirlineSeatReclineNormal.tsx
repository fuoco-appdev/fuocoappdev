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
      d="M7.59 5.41c-.78-.78-.78-2.05 0-2.83.78-.78 2.05-.78 2.83 0 .78.78.78 2.05 0 2.83-.79.79-2.05.79-2.83 0ZM6 16V7H4v9c0 2.76 2.24 5 5 5h6v-2H9c-1.66 0-3-1.34-3-3Zm8.93-1L20 20.07l-1.43 1.43-3.5-3.5H10c-1.66 0-3-1.34-3-3V9.25C7 8.01 8.01 7 9.25 7h.03c.34 0 .67.09.96.23.26.12.5.29.69.5l1.4 1.55c1.06 1.17 3.01 2.06 4.67 2.04v2.16c-1.9 0-4.1-1.01-5.5-2.16V15h3.43Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
