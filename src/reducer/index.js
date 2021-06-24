import * as Localization from 'expo-localization';

const deviceLang = Localization.locale.slice(0, 2);

const initialState = {
  deviceLang,
  translations: {
    es: {
      statistics: 'Estadísticas',
      height: 'Altura',
      weight: 'Peso',
      search: 'Buscar',
      cancel: 'Cancelar',
    },
    en: {
      statistics: 'Statistics',
      height: 'Height',
      weight: 'Weight',
      search: 'Search',
      cancel: 'Cancel',
    },
    fr: {
      statistics: 'Statistiques',
      height: 'Taille',
      weight: 'Poids',
      search: 'Rechercher',
      cancel: 'Quitter',
    },
  },
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LANG':
      return {
        ...state,
        deviceLang: action.payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
