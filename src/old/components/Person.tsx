import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { fetchPersonById as fetchPersonByIdAction } from '../actions/people';
import './Person.css';
import { Person as PersonType } from '../reducers/people';
import { useEffect } from 'react';

interface PersonStateProps {
  loading: boolean;
  error?: string;
  person?: PersonType;
}

interface PersonDispatchProps {
  fetchPersonById: typeof fetchPersonByIdAction;
}

interface PersonOwnProps {
  id: number;
}

type PersonProps = PersonStateProps & PersonDispatchProps & PersonOwnProps;

export function PersonImpl({
  id,
  loading,
  error,
  person,
  fetchPersonById,
}: PersonProps) {
  useEffect(() => {
    fetchPersonById(id);
  }, [fetchPersonById, id]);

  return (
    <div>
      {loading && <div>loading...</div>}
      {error && (
        <div>
          <div>{error}</div>
          <button
            onClick={() => {
              fetchPersonById(id);
            }}
          >
            reload
          </button>
        </div>
      )}
      {person && (
        <div>
          <table className="person__table">
            <tr>
              <th>name:</th>
              <td>{person.name}</td>
            </tr>
            <tr>
              <th>height:</th>
              <td>{person.height} cm</td>
            </tr>
            <tr>
              <th>mass:</th>
              <td>{person.mass} kg</td>
            </tr>
            <tr>
              <th>hair color:</th>
              <td>{person.hairColor}</td>
            </tr>
          </table>
          <button
            onClick={() => {
              fetchPersonById(id);
            }}
          >
            reload
          </button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (
  state: RootState,
  ownProps: PersonOwnProps
): PersonStateProps => {
  const { id } = ownProps;
  return {
    loading: !state.people[id] || state.people[id].loading,
    error: state.people[id]?.error,
    person: state.people[id]?.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): PersonDispatchProps => {
  return bindActionCreators(
    {
      fetchPersonById: fetchPersonByIdAction,
    },
    dispatch
  );
};

export const Person = connect<
  PersonStateProps,
  PersonDispatchProps,
  PersonOwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(PersonImpl);
