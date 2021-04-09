import { Dispatch } from 'redux';
import { Person } from '../reducers/people';

const API_BASE = 'https://swapi.dev/api/people';

export enum PeopleActionTypeKeys {
  PEOPLE_LOAD_START = 'PEOPLE_LOAD_START',
  PEOPLE_LOAD_ERROR = 'PEOPLE_LOAD_ERROR',
  PEOPLE_LOAD_SUCCESS = 'PEOPLE_LOAD_SUCCESS',
}

export interface PeopleLoadStartAction {
  type: PeopleActionTypeKeys.PEOPLE_LOAD_START;
  id: number;
}

export interface PeopleLoadErrorAction {
  type: PeopleActionTypeKeys.PEOPLE_LOAD_ERROR;
  id: number;
  error: string;
}

export interface PeopleLoadSuccessAction {
  type: PeopleActionTypeKeys.PEOPLE_LOAD_SUCCESS;
  id: number;
  data: Person;
}

export type PeopleActionTypes =
  | PeopleLoadStartAction
  | PeopleLoadErrorAction
  | PeopleLoadSuccessAction;

export function loadPersonStart(id: number): PeopleLoadStartAction {
  return {
    type: PeopleActionTypeKeys.PEOPLE_LOAD_START,
    id,
  };
}

export function loadPersonError(
  id: number,
  error: string
): PeopleLoadErrorAction {
  return {
    type: PeopleActionTypeKeys.PEOPLE_LOAD_ERROR,
    id,
    error,
  };
}

export function loadPersonSuccess(
  id: number,
  data: Person
): PeopleLoadSuccessAction {
  return {
    type: PeopleActionTypeKeys.PEOPLE_LOAD_SUCCESS,
    id,
    data,
  };
}

export function fetchPersonById(id: number) {
  return (dispatch: Dispatch) => {
    const url = `${API_BASE}/${id}`;
    dispatch(loadPersonStart(id));
    setTimeout(async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        dispatch(
          loadPersonSuccess(id, {
            name: data.name,
            height: Number(data.height),
            mass: Number(data.mass),
            hairColor: data.hair_color,
            skinColor: data.skin_color,
            eyeColor: data.eye_color,
            birthYear: data.birth_year,
            gender: data.gender,
            created: data.created,
            edited: data.edited,
            url: data.url,
          })
        );
      } catch (e) {
        dispatch(loadPersonError(id, e.message));
      }
    }, 2000);
  };
}
