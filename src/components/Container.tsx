import { SafeAreaView } from './custom';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => (
  <SafeAreaView bg="background.dark" alignItems="center" py="2" px="5">
    {children}
  </SafeAreaView>
);
