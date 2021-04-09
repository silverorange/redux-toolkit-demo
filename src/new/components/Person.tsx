import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchPersonById } from '../store/people';
import './Person.css';

interface PersonProps {
  id: number;
}

export function Person({ id }: PersonProps) {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => !state.people[id] || state.people[id].loading
  );
  const error = useSelector((state: RootState) => state.people[id]?.error);
  const person = useSelector((state: RootState) => state.people[id]?.data);

  useEffect(() => {
    dispatch(fetchPersonById(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading && <div>loading...</div>}
      {error && (
        <div>
          <div>{error}</div>
          <button
            onClick={() => {
              dispatch(fetchPersonById(id));
            }}
          >
            reload
          </button>
        </div>
      )}
      {person && (
        <div>
          <table className="person__table">
            <tbody>
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
            </tbody>
          </table>
          <button
            onClick={() => {
              dispatch(fetchPersonById(id));
            }}
          >
            reload
          </button>
        </div>
      )}
    </div>
  );
}
