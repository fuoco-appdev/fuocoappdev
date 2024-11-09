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
      d="M11.99 1v4c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8h2c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6v4l-5-5 5-5Zm-1.95 15h.85v-4.27h-.09l-1.77.63v.69l1.01-.31V16Zm5.13-1.76c0 .32-.03.6-.1.82-.07.22-.17.42-.29.57-.12.15-.28.26-.45.33-.17.07-.37.1-.59.1-.22 0-.41-.03-.59-.1s-.33-.18-.46-.33c-.13-.15-.23-.34-.3-.57-.07-.23-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82.07-.22.17-.42.29-.57.12-.15.28-.26.45-.33.17-.07.37-.1.59-.1.22 0 .41.03.59.1s.33.18.46.33c.13.15.23.34.3.57.07.23.11.5.11.82v.74Zm-.89-1.34c.03.13.04.29.04.48h-.01v.97c0 .19-.02.35-.04.48s-.06.24-.11.32c-.05.08-.12.14-.19.17a.655.655 0 0 1-.5 0 .389.389 0 0 1-.19-.17c-.05-.08-.09-.19-.12-.32s-.04-.29-.04-.48v-.97c0-.19.01-.35.04-.48s.07-.23.12-.31c.05-.08.12-.14.19-.17a.655.655 0 0 1 .5 0c.08.03.14.09.19.17.05.08.09.18.12.31Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon