import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import moment from 'moment';
import { RiSyringeLine, RiBugLine, RiCalendarLine } from 'react-icons/ri';
import { GiEarthWorm, GiTooth } from 'react-icons/gi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

function LongTermElement({ treatment }) {
  function selectIcon() {
    switch (treatment[1].treatment) {
      case 'Vaccination':
        return <RiSyringeLine />;
      case 'Deworming':
        return <GiEarthWorm />;
      case 'Flea Control':
        return <RiBugLine />;
      case 'Dental care':
        return <GiTooth />;
      case 'Periodic check':
        return <RiCalendarLine />;
      case 'Other':
        return <BiDotsHorizontalRounded />;
      default:
        return <BiDotsHorizontalRounded />;
    }
  }

  return (
    <HStack w="100%" diplay="flex" justifyContent="space-between">
      {selectIcon()}
      <Text flexGrow="1" pl={3}>{treatment[1].treatment}</Text>
      <Text maxW="30%" textColor="grey">{moment.unix(treatment[0]).fromNow()}</Text>
    </HStack>
  );
}

export default LongTermElement;
