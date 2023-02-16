import { Flex } from '@chakra-ui/react';
import { TabProperties, Tabs } from '@electrocrud/tabs';
import { FC, ReactElement, useMemo } from 'react';
import { IconType } from 'react-icons';

export type TabLayoutContentProperties = {
  element: ReactElement;
  label: string;
  isCloseable?: boolean;
  icon: IconType;
};

export type TabLayoutProperties = {
  content: TabLayoutContentProperties[];
  isFitted?: boolean;
};

export const TabLayout: FC<TabLayoutProperties> = ({
  content,
  isFitted = true,
}) => {
  const tabs = useMemo<TabProperties[]>(
    () =>
      content.map((item) => ({
        name: item.label,
        element: item.element,
        icon: item.icon,
        closeable: item.isCloseable,
      })),
    [content]
  );

  return (
    <Flex w="100%" borderRadius="lg" overflow="hidden">
      <Tabs
        tabsList={tabs}
        tabIndex={0}
        iconSize="18px"
        colorScheme="primary"
        fontSize="lg"
        hasScrollbar
        fillAvailable
        isFitted={isFitted}
        mt={0}
        marginTop={2}
      />
    </Flex>
  );
};
