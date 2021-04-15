import uuid from 'react-uuid'

export let firmStruct = {
  branches: [
    {
      id: uuid(),
      title: 'management',
      subBranches: [
        {
          id: uuid(),
          title: 'finance management',
          employees: [
            {
              id: uuid(),
              name: 'Fil',
              surname: 'Ales',
              job: 'manager',
              salary: 2000,
            },
            {
              id: uuid(),
              name: 'Fil',
              surname: 'Dotha',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Rik',
              surname: 'Fens',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Daniel',
              surname: 'Hernandez',
              job: 'worker',
              salary: 800,
            },
          ]
        },
        {
          id: uuid(),
          title: 'sale management',
          employees: [
            {
              id: uuid(),
              name: 'John',
              surname: 'Smith',
              job: 'manager',
              salary: 2000,
            },
            {
              id: uuid(),
              name: 'Michael',
              surname: 'Dorthy',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Pol',
              surname: 'Adamson',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Leanne',
              surname: 'Graham',
              job: 'worker',
              salary: 800,
            },
            {
              id: uuid(),
              name: 'Declan',
              surname: 'Harris',
              job: 'worker',
              salary: 800,
            },
          ]
        },
      ]
    },
    {
      id: uuid(),
      title: 'production',
      subBranches: [
        {
          id: uuid(),
          title: 'goods',
          employees: [
            {
              id: uuid(),
              name: 'Alex',
              surname: 'Field',
              job: 'manager',
              salary: 3000,
            },
            {
              id: uuid(),
              name: 'Dominic',
              surname: 'Clark',
              job: 'worker',
              salary: 700,
            },
            {
              id: uuid(),
              name: 'Carter',
              surname: 'Rodriguez',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Easton',
              surname: 'Lewis',
              job: 'worker',
              salary: 800,
            },
          ]
        },
        {
          id: uuid(),
          title: 'clothes',
          employees: [
            {
              id: uuid(),
              name: 'Charles',
              surname: 'Martinez',
              job: 'manager',
              salary: 2000,
            },
            {
              id: uuid(),
              name: 'Chase',
              surname: 'Anderson',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Cole',
              surname: 'Taylor',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Ann',
              surname: 'Thomas',
              job: 'worker',
              salary: 800,
            },
          ]
        },
      ]
    },
    {
      id: uuid(),
      title: 'marketing',
      subBranches: [
        {
          id: uuid(),
          title: 'marketing department',
          employees: [
            {
              id: uuid(),
              name: 'John',
              surname: 'Smith',
              job: 'manager',
              salary: 3000,
            },
            {
              id: uuid(),
              name: 'Eli',
              surname: 'Robinson',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Elijah',
              surname: 'Walker',
              job: 'worker',
              salary: 900,
            },
            {
              id: uuid(),
              name: 'Elliot',
              surname: 'Perez',
              job: 'worker',
              salary: 1000,
            },
            {
              id: uuid(),
              name: 'Emerson',
              surname: 'Hall',
              job: 'worker',
              salary: 800,
            },
            {
              id: uuid(),
              name: 'Emmett',
              surname: 'Young',
              job: 'worker',
              salary: 800,
            },
          ]
        }
      ],
    },
  ],
  directors: {
    [uuid()]: {
      id: uuid(),
      name: 'Ethan',
      surname: 'Allen',
      job: 'general',
      salary: 10000
    },
    [uuid()]: {
      id: uuid(),
      name: 'Evan',
      surname: 'Sanchez',
      job: 'management',
      salary: 8000
    },
    [uuid()]: {
      id: uuid(),
      name: 'Everett',
      surname: 'Wright',
      job: 'production',
      salary: 7000
    },
    [uuid()]: {
      id: uuid(),
      name: 'Ezra',
      surname: 'King',
      job: 'marketing',
      salary: 6000
    },
  }
}
