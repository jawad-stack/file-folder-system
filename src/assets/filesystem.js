export const fileSystem = [
    { type: 'file', name: 'newres.pdf' },

    {
      type: 'folder',
      name: 'Documents',
      children: [
        { type: 'file', name: 'Resume.pdf' },
        { type: 'file', name: 'CoverLetter.docx' },
        {
          type: 'folder',
          name: 'Photos',
          children: [
            { type: 'file', name: 'Vacation.jpg' },
            { type: 'file', name: 'ProfilePic.png' }
          ]
        }
      ]
    },
    {
      type: 'folder',
      name: 'Projects',
      children: [
        { type: 'file', name: 'Project1.zip' },
        { type: 'file', name: 'Project2.zip' }
      ]
    }
  ];