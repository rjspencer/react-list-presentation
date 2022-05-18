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

export const Pagination = () => {
  useBenchmark('React Benchmark')
  const [page, changePage] = useState<number>(1)

  const previous = () => changePage(page - 1)
  const next = () => changePage(page + 1)

  const [people] = useState<Array<Person>>(Array(1000).fill('').map(() => generatePerson()))

  return (
    <div>
      <h2>Progressive loading</h2>
      <div style={{ marginBottom: '16px' }}>
        {people.slice((page - 1) * 20, page * 20).map(person => <PersonItem person={person} />)}
      </div>
      <div>Page {page} of {people.length}</div>
      <button onClick={previous} disabled={page === 1}>Prev</button>
      <button onClick={next} disabled={page === Math.ceil(people.length / 20)} >Next</button>
    </div>
  )
};
