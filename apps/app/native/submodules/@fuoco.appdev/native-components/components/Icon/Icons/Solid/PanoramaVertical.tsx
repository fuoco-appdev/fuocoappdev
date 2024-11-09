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
      d="M18.3 12c0 3.09.54 6.18 1.64 9.12.04.11.06.21.07.31 0 .33-.24.57-.63.57H4.63c-.4 0-.63-.24-.63-.57 0-.09.02-.2.07-.31A26.24 26.24 0 0 0 5.71 12c0-3.09-.55-6.18-1.65-9.12A.894.894 0 0 1 4 2.57c0-.34.23-.57.63-.57h14.74c.4 0 .63.23.63.57 0 .09-.02.2-.06.31A26.243 26.243 0 0 0 18.3 12ZM7.7 12c0 2.72-.39 5.4-1.16 8h10.91c-.77-2.6-1.16-5.28-1.16-8 0-2.72.39-5.4 1.16-8H6.54c.77 2.6 1.16 5.28 1.16 8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
