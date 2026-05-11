import { filterSpaces } from '../utils/filter'
import type { Space } from '../../../shared/spaces'

const mockSpaces: Space[] = [
  {
    id: '1',
    name: 'Desk 1',
    building: {
      id: 'building-1',
      name: 'Bloc',
    },
    available: true,
    coords: '',
  },
  {
    id: '2',
    name: 'Desk 2',
    building: {
      id: 'building-1',
      name: 'Bloc',
    },
    available: false,
    coords: '',
  },
  {
    id: '3',
    name: 'Desk 3',
    building: {
      id: 'building-2',
      name: 'Alderley Park',
    },
    available: true,
    coords: '',
  },
]

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message)
  }
}

// test 1
const availableOnly = filterSpaces(
  mockSpaces,
  'all',
  'available'
)

assert(
  availableOnly.length === 2,
  'Should return 2 available spaces'
)

// test 2
const blocOnly = filterSpaces(
  mockSpaces,
  'building-1',
  'all'
)

assert(
  blocOnly.length === 2,
  'Should return 2 spaces in Bloc'
)

// test 3
const blocAvailableOnly = filterSpaces(
  mockSpaces,
  'building-1',
  'available'
)

assert(
  blocAvailableOnly.length === 1,
  'Should return 1 available space in Bloc'
)

console.log('All tests passed!')