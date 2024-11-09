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
      d="M21.12 4.06c.11-.04.21-.06.31-.06.33 0 .57.23.57.63v14.74c0 .4-.24.63-.57.63-.1 0-.2-.02-.31-.06A26.24 26.24 0 0 0 12 18.3c-3.09 0-6.18.54-9.12 1.64-.11.04-.21.06-.31.06-.34 0-.57-.23-.57-.62V4.63c0-.4.23-.63.57-.63.09 0 .2.02.31.06A26.24 26.24 0 0 0 12 5.7c3.09 0 6.18-.54 9.12-1.64ZM20 17.45V6.54c-2.6.78-5.28 1.17-8 1.16-2.72 0-5.4-.39-8-1.16v10.91c2.6-.77 5.28-1.16 8-1.16 2.72 0 5.4.39 8 1.16Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
