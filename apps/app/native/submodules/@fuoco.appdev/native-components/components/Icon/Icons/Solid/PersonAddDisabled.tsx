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
      d="m0 3.12 4 4V10H1v2h3v3h2v-3h2.88l2.51 2.51C9.19 15.11 7 16.3 7 18v2h9.88l4 4 1.41-1.41L1.41 1.71 0 3.12Zm14.604 8.846a8.969 8.969 0 0 0-.124-.016l-3.43-3.43a9.037 9.037 0 0 0-.016-.124v-.002A2.96 2.96 0 0 1 11 8c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4a2.96 2.96 0 0 1-.394-.034h-.002ZM22.53 20l-5.84-5.84C19.44 14.5 23 15.86 23 18v2h-.47ZM6 10h.88L6 9.12V10Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
