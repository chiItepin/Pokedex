import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: 100,
    padding: 20,
  },
  contentColumnWrapper: {
    paddingHorizontal: 10,
  },
  navbar: {
    backgroundColor: '#C2252C',
  },
  navbarSide: {
    flex: 1,
  },
  navbarImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderWidth: 0,
    borderColor: '#fff',
  },
  mainCardView: {
    flex: 1,
    margin: 10,
  },
  cardView: {
    flex: 1,
    margin: 2,
  },
  cardImage: {
    width: '100%',
    height: 75,
    resizeMode: 'contain',
  },
  cardText: {
    color: '#505050',
    textAlign: 'center',
    width: '100%',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchFieldContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: '#f2f2f2',
  },
  searchTextField: {
    height: 40,
  },
  searchFieldIcon: {
    color: '#575757',
  },
  searchFieldClearBtn: {
    height: 30,
    alignSelf: 'center',
  },
  loadMoreBtn: {
    backgroundColor: '#C2252C',
    marginVertical: 10,
    padding: 5,
    alignSelf: 'center',
  },
  loadMoreBtnText: {
    color: '#fff',
  },
  grid: {
    width: '100%',
    alignItems: 'flex-start',
    padding: 15,
  },
  row: {
    width: '100%',
  },
  cardMainImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  pokemonId: {
    color: '#8c8c8c',
  },
  pokemonTitle: {
    fontWeight: '600',
    fontSize: 28,
  },
  measureGrid: {
    flexDirection: 'column',
  },
  measureCol: {
    flexDirection: 'row',
  },
  measureTitle: {
    marginRight: 4,
    fontWeight: '600',
    color: '#8c8c8c',
  },
  pokemonDescription: {
    textAlign: 'center',
    marginTop: 14,
    width: '100%',
  },
  gridStatBar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  sideStatHeadlineCol: {
    flex: 0.2,
    maxWidth: '20%',
    paddingHorizontal: 5,
  },
  sideStatBarCol: {
    maxWidth: '80%',
    fontWeight: '600',
  },
  sideStatsBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    height: 15,
  },
  sideStatsBarFilled: {
    // backgroundColor: '#5779d0',
    borderRadius: 6,
    height: '100%',
    width: '50%',
  },
  sideStatsBarTooltip: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 15,
    top: -5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4,
  },
  sideStatsBarTooltipText: {
    fontWeight: '600',
  },
  berryCard: {
    flex: 1,
    marginVertical: 2,
    marginHorizontal: 10,
  },
  berryFlavorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  berryFlavorItem: {
    width: '100%',
    marginVertical: 4,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default styles;
