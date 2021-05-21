const en = {

  Header: {
    Home: 'Home',
    'Poke Info': 'Poke Info',
    'Firm Structure': 'Firm Structure',
    HeaderContactsText: 'address, location and stuff',
  },

  Description: {
    'Read Less': 'Read Less',
    'Read More': 'Read More',
    descriptionTitle: `This project shows git, 
                       node.js basis, and also html and css slightly.`,

    titleVcs: 'What is VCS, what is need for',
    descriptionVcs: `
      Version Control System (VCS)
      – This is the system we can fixate file changes, 
      and go back to previous point if it necessary.
      Git – One of the most popular distributed systems.
      «Distributed» is that each of developers has full 
       project copy and all of them can work together.
       Server has main project copy.
`,

    titleGit: 'checkout, add, commit, pull, push. Merge and branch basis',
    descriptionGit: `
      - "checkout" uses with commit parameters
      branch and file. And also with parameters or without.
      - git checkout “branch” – put HEAD pointer to
      the target branch end.
      - "git add ." – add to index all of current directory files.
      - git pull – load remote content and try to change local repository state,
      bring its state to current content (make merge).
      – git branch “new branch”(without checkout to  new branch)
      or git checkout –b “new branch” (with checkout).
`,

    titleCss: 'Css: styles, classes, identifications, selectors, pseudoclasses, pseudoelements',
    descriptionCss: `
    Styles defines external view html elements.
      Bounded – through connection external styles file.
      Global – define in 'style' tag. 
      Internal – defined through the 'style' attribute in tag.
      Identificator is defined with the “id” attribute, and should be uniq.
      Pseudoclasses defines dynamic elements state, 
      which being changed by user activity.
      Pseudoelements setup elements style which are not defined in DOM.
`,

    titleHtml: 'Html: tags, the structure of html page, block and inline elements.',
    descriptionHtml: `
      HTML — HyperText Markup Language for web sites.
      Lists are numerous (ol) and marked (ul),
      list  elements – “li”.
      Table information display is available with 'table' tag.
      Attribute — uses for definition html-element characteristics.
      Html have tags for text formatting.
      W3c – organizations, which develop and apply technology's standarts for web .
`,

    titleNodejs: 'What is nodejs, what is it need for and how to setup',
    descriptionNodejs: `
      Node.js — this isо JavaScript-environment built with Chrome V8 engine.
      Node do some activity at the server. Using node Node one can 
      write whole applications. Node can cooperate with external libraries, 
      invoke commands from JavaScript code and become to be web server.
      For setting it up we need to go to official web site 
      https://nodejs.org and download it from the main page
      last stable version for the yours OS.
`,

    titleNpm: 'What is node package manager, npm setup.',
    descriptionNpm: `
      Package manager — multiplicity of applications, 
      which runs setting up process, deletion process, 
      settings and updating process of different Program supporting components.
      Npm built-in into nodejs.
`,
  },

  PokeInfo: {
    'See details': 'See details',
    Description: 'Description',
    Loading: 'Loading',
    Abilities: 'Abilities',
    'Pokemon Details': 'Pokemon Details',
    Close: 'Close',
  },

  FirmStructure: {
    branches: 'Branches',
    subBranches: 'Subbranches',
    directors: 'Directors',
    Add: 'Add',
    Remove: 'Remove',
    Job: 'Job',
    Surname: 'Surname',
    Salary: 'Salary',
    Title: 'Title',
    Reset: 'Reset',
    'Input item to FirmStruct': 'Input item to FirmStruct',
    'Enter job': 'Enter job',
    'Enter Name': 'Enter Name',
    'Enter Surname': 'Enter Surname',
    'Enter salary': 'Enter salary',
    'Branch name': 'Branch name',
    'Enter branch name': 'Enter branch name',
  },
  common: {
    Name: 'Name',
  },

};

export default en;
