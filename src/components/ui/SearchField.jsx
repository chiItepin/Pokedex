import React from 'react';
import {
  Input,
  Icon,
  Item,
  Button,
  Text,
} from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GlobalStyles from '../../styles/GlobalStyles';

const SearchField = ({
  searchValue,
  setSearchValue,
  handleSearchSubmit,
  clearSearchField,
  deviceLang,
  translations,
}) => (
  <View style={GlobalStyles.searchContainer}>
    <Item style={GlobalStyles.searchFieldContainer}>
      <Icon active name="search" style={GlobalStyles.searchFieldIcon} />
      <Input
        placeholder={translations?.[deviceLang]?.search ? translations[deviceLang].search : 'Search'}
        style={GlobalStyles.searchTextField}
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
        onSubmitEditing={handleSearchSubmit}
      />
      {
        searchValue !== '' && (
          <Button onPress={clearSearchField} transparent style={GlobalStyles.searchFieldClearBtn}>
            <Text>{translations?.[deviceLang]?.cancel ? translations[deviceLang].cancel : 'Cancel'}</Text>
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
  deviceLang: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  deviceLang: state.deviceLang,
  translations: state.translations,
});

export default connect(mapStateToProps)(SearchField);
