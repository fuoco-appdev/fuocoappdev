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
      d="m1 9 2 2c2.88-2.88 6.79-4.08 10.53-3.62l1.19-2.68C9.89 3.84 4.74 5.27 1 9Zm14.9-4c-.17 0-.32.09-.41.23l-.07.15-5.18 11.65c-.16.29-.26.61-.26.96 0 1.11.9 2.01 2.01 2.01.96 0 1.77-.68 1.96-1.59l.01-.03L16.4 5.5c0-.28-.22-.5-.5-.5ZM23 9l-2 2a12.619 12.619 0 0 0-4.12-2.75l.53-2.82C19.45 6.18 21.36 7.36 23 9Zm-6 6 2-2c-.8-.8-1.7-1.42-2.66-1.89l-.55 2.92c.42.27.83.59 1.21.97ZM7 15l-2-2c2.01-2.01 4.68-2.96 7.31-2.88L11.03 13A7.1 7.1 0 0 0 7 15Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
