import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4.5 20V10h12v1c.7 0 1.37.1 2 .29V10c0-1.1-.9-2-2-2h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2h-1c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6.26c-.42-.6-.75-1.28-.97-2H4.5Zm3-14c0-1.66 1.34-3 3-3s3 1.34 3 3v2h-6V6Z" />
    <Path d="M16.5 13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm1.65 7.35L16 18.2V15h1v2.79l1.85 1.85-.7.71Z" />
  </Svg>
)

export default Icon
