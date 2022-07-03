import {
  Box,
  Button,
  Center,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MotionHStack } from "../../utils/motion";
import { motion } from "framer-motion";
import { categoryList, languageList } from "../../utils/constants";

const FilterSection = ({ filters, setFilters }) => {
  const [selectedCat, setSelectedCat] = useState(filters.category || "All");
  const [selectedLang, setSelectedLang] = useState(filters.language || "All");

  console.log({ selectedCat }, { selectedLang });

  return (
    <HStack
      my={3}
      align="center"
      justify={{ base: "start", md: "flex-end" }}
    >
      <HStack
        background={useColorModeValue("#EDF2F7", "#FFFFFF14")}
        borderRadius="8px"
        w="120px"
        h="40px"
        justify="center"
        spacing={5}
      >
        <Text fontWeight="700">HD?</Text>
        <Switch
          isChecked={filters?.isHd}
          onChange={(e) =>
            setFilters({
              ...filters,
              isHd: e.target.checked,
            })
          }
        />
      </HStack>

      <Popover>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button rightIcon={<ChevronDownIcon />}>Category</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <RadioGroup
                  value={selectedCat}
                  defaultValue={selectedCat}
                  onChange={(e) => setSelectedCat(e)}
                >
                  <Stack>
                    {categoryList?.map((cat) => {
                      return (
                        <Radio value={cat} key={cat}>
                          {cat}
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    setFilters({
                      ...filters,
                      category: selectedCat === "All" ? undefined : selectedCat,
                    });
                    onClose();
                  }}
                >
                  Save
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </>
        )}
      </Popover>

      <Popover>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button rightIcon={<ChevronDownIcon />}>Language</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <RadioGroup
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e)}
                >
                  <Stack>
                    {languageList?.map((lang) => {
                      return (
                        <Radio value={lang} key={lang}>
                          {lang}
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    setFilters({
                      ...filters,
                      language:
                        selectedLang === "All" ? undefined : selectedLang,
                    });
                    onClose();
                  }}
                >
                  Save
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </>
        )}
      </Popover>
    </HStack>
  );
};

export default FilterSection;
