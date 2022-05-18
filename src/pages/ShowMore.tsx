import { useState } from "react";
import { useBenchmark } from "../hooks/useBenchmark";
import { generatePerson, Person } from "../data/person";

const PersonItem = ({ person }: { person: Person }) => {
  return (
    <div style={{
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: '10px repeat(4, 1fr)',
    }}>
      <div style={{ padding: '14px 16px', borderLeft: `5px solid ${person.favoriteColor}` }}></div>
      <div>{person.first} {person.last}</div>
      <div>{person.email}</div>
      <div>{person.age}</div>
      <div>{person.state}</div>
    </div>
  )
}

export const ShowMore = () => {
  useBenchmark('React Benchmark')
  const [show, changeShow] = useState<number>(20)

  const showMore = () => changeShow(show + 20)

  const [people] = useState<Array<Person>>(Array(1000).fill('').map(() => generatePerson()))

  return (
    <div>
      <h2>Progressive loading</h2>
      <div style={{ marginBottom: '16px' }}>
        {people.slice(0, show).map(person => <PersonItem person={person} />)}
      </div>
      <button onClick={showMore}>Show More</button>
    </div>
  )
};
