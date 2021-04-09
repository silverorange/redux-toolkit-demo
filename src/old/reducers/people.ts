import { PeopleActionTypes, PeopleActionTypeKeys } from '../actions/people';

export interface Person {
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  created: string;
  edited: string;
  url: string;
}

export interface PeopleState {
  [id: number]: {
    loading: boolean;
    error?: string;
    data?: Person;
  };
}

const peopleInitialState: PeopleState = {};

export const peopleReducer = (
  state: PeopleState = peopleInitialState,
  action: PeopleActionTypes
): PeopleState => {
  switch (action.type) {
    case PeopleActionTypeKeys.PEOPLE_LOAD_START: {
      return {
        ...state,
        [action.id]: {
          loading: true,
          error: undefined,
          data: undefined,
        },
      };
    }
    case PeopleActionTypeKeys.PEOPLE_LOAD_ERROR: {
      return {
        ...state,
        [action.id]: {
          loading: false,
          error: action.error,
          data: undefined,
        },
      };
    }
    case PeopleActionTypeKeys.PEOPLE_LOAD_SUCCESS: {
      return {
        ...state,
        [action.id]: {
          loading: false,
          error: undefined,
          data: action.data,
        },
      };
    }
    default:
      return state;
  }
};
