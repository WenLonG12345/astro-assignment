import {
  Button,
  useDisclosure,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  IconButton,
  Show,
  CheckboxGroup,
  Checkbox,
  Stack,
  Box,
  Switch,
  HStack,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { connect, useDispatch } from "react-redux";
import { categoryList, languageList } from "../../utils/constants";

const mapState = ({ channelModel }) => ({
  channelModel,
});

const FilterButton = ({ channelModel }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFilters, setSelectedFilters] = useState({});
  const btnRef = useRef();
  const dispatch = useDispatch();

  const { filters = {} } = channelModel || {};

  const onSubmit = () => {
    dispatch.channelModel.setFilters(selectedFilters);
    onClose();
  };

  const onClear = () => {
    dispatch.channelModel.clearFilters();
    onClose();
  };

  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters])
  
  return (
    <>
      <Show above="md">
        <Button leftIcon={<AiOutlineFilter />} onClick={onOpen}>
          Filter
        </Button>
      </Show>
      <Show below="md">
        <IconButton onClick={onOpen} icon={<AiOutlineFilter />} />
      </Show>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter</DrawerHeader>

          <DrawerBody>
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold" my={3}>
                HD Resolution?
              </Text>
              <Switch
                isChecked={selectedFilters?.isHd}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    isHd: e.target.checked,
                  })
                }
              />
            </Flex>

            <Text fontWeight="bold" mb={3}>
              Category
            </Text>
            <CheckboxGroup
              defaultValue={selectedFilters?.category}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, category: e })
              }
            >
              <Stack>
                {categoryList?.map((cat) => {
                  return (
                    <Checkbox value={cat} key={cat}>
                      {cat}
                    </Checkbox>
                  );
                })}
              </Stack>
            </CheckboxGroup>

            <Text fontWeight="bold" my={3}>
              Language
            </Text>
            <CheckboxGroup
              defaultValue={selectedFilters?.language}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, language: e })
              }
            >
              <Stack>
                {languageList?.map((lang) => {
                  return (
                    <Checkbox value={lang} key={lang}>
                      {lang}
                    </Checkbox>
                  );
                })}
              </Stack>
            </CheckboxGroup>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClear}>
              Clear
            </Button>
            <Button colorScheme="blue" onClick={onSubmit}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default connect(mapState)(FilterButton);
