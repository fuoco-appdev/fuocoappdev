import { View } from 'react-native';

export interface TermsOfServiceProps {
  children?: React.ReactNode;
}

export default function TermsOfService({ children }: TermsOfServiceProps) {
  return <View>{children}</View>;
}
