import React from 'react';
import {
  Input,
  Icon,
  Item,
  Button,
  Text,
} from 'native-base';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../styles/GlobalStyles';

const SearchField = ({
  searchValue,
  setSearchValue,
  handleSearchSubmit,
  clearSearchField,
}) => (
  <View style={GlobalStyles.searchContainer}>
    <Item style={GlobalStyles.searchFieldContainer}>
      <Icon active name="search" style={GlobalStyles.searchFieldIcon} />
      <Input
        placeholder="Search"
        style={GlobalStyles.searchTextField}
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
        onSubmitEditing={handleSearchSubmit}
      />
      {
        searchValue !== '' && (
          <Button onPress={clearSearchField} transparent style={GlobalStyles.searchFieldClearBtn}>
            <Text>Cancel</Text>
          </Button>
        )
      }
    </Item>
  </View>
);

SearchField.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  clearSearchField: PropTypes.func.isRequired,
};

export default SearchField;
