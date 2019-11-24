const settings = [
  {
    Id: '001',
    FormType: 'Evaluation',
    IsEnabled: true,
    Settings: [
      {
        ObjectType: 'Course',
        IsEnabled: true,
        IsMandatory: false,
        DefaultTemplateId: '00000000-0000-0000-0000-000000000000'
      },
      {
        ObjectType: 'Event',
        IsEnabled: true,
        IsMandatory: false,
        DefaultTemplateId: '2'
      }
    ]
  },
  {
    Id: '002',
    FormType: 'Reflection',
    FormSubType: 'SRAReflection',
    IsEnabled: true,
    Settings: [
      {
        ObjectType: null,
        IsEnabled: false,
        DefaultTemplateId: 'd448c798-2d8a-4a1e-b3f7-e0372fd8a3e8',
        PersonGroupId: '1'
      }
    ]
  },
  {
    Id: '003',
    FormType: 'Reflection',
    FormSubType: 'StandardReflection',
    IsEnabled: false,
    Settings: [
      {
        ObjectType: null,
        IsEnabled: false,
        DefaultTemplateId: null,
        PersonGroupId: '00000000-0000-0000-0000-000000000000'
      }
    ]
  }
];

const forms = [
  {
    Id: '00000000-0000-0000-0000-000000000000',
    FormType: 'Evaluation',
    Title: 'Default form',
    IsMandatory: false,
    IsSystemProvided: true,
    IssueDelayDays: 1,
    RelatedFormTemplateIds: ['00'],
    Questions: [
      {
        Type: 'StarRating',
        IsMandatory: true,
        Position: 0,
        Text: 'Rate with stars'
      },
      {
        Type: 'Options',
        IsMandatory: false,
        Position: 1,
        Text: 'Want some options?',
        Options: [
          {
            Position: 1,
            Text: 'Option 1'
          },
          {
            Position: 2,
            Text: 'Option 2'
          }
        ],
        IsOptionNumberDisplayed: true,
        IsSupportingQuestionEnabled: true,
        SupportingQuestion: 'Use this follow up?'
      },
      {
        Type: 'Text',
        IsMandatory: false,
        Position: 2,
        Text: 'How was the course?'
      },
      {
        Type: 'Nps',
        IsMandatory: true,
        Position: 3,
        Text: ''
      },
    ]
  },
  {
    Id: '00',
    FormType: 'Evaluation',
    FormSubType: 'FollowUp',
    Title: 'Recommended Follow Up',
    IsMandatory: false,
    IsSystemProvided: true,
    IssueDelayDays: 12,
    Questions: [
      {
        Type: 'Options',
        IsMandatory: false,
        Position: 0,
        Text: 'Want some options?',
        Options: [
          {
            Position: 1,
            Text: 'Option 1'
          },
          {
            Position: 2,
            Text: 'Option 2'
          }
        ],
        IsOptionNumberDisplayed: true,
        IsSupportingQuestionEnabled: true,
        SupportingQuestion: 'Use this follow up?'
      },
    ]
  },
  {
    Id: '2',
    FormType: 'Evaluation',
    Title: 'Form Two',
    IsMandatory: false,
    IsSystemProvided: false,
    IssueDelayDays: 1,
    RelatedFormTemplateIds: [],
    Questions: [
      {
        Type: 'Options',
        IsMandatory: false,
        Position: 0,
        Text: 'Want some options?',
        Options: [
          {
            Position: 1,
            Text: 'Option 1'
          },
          {
            Position: 2,
            Text: 'Option 2'
          }
        ],
        IsOptionNumberDisplayed: true,
        IsSupportingQuestionEnabled: true,
        SupportingQuestion: 'Use this follow up?'
      },
    ]
  },
  {
    Id: '3',
    FormType: 'Evaluation',
    Title: 'Form Three',
    IsMandatory: false,
    IsSystemProvided: false,
    IssueDelayDays: 1,
    RelatedFormTemplateIds: [],
    Questions: [
      {
        Type: 'Text',
        IsMandatory: false,
        Position: 0,
        Text: 'How was the course?'
      },
    ]
  },
  {
    Id: '10',
    FormType: 'Evaluation',
    Title: 'Evaluation with Follow ups',
    IsMandatory: false,
    IsSystemProvided: false,
    IssueDelayDays: 1,
    RelatedFormTemplateIds: [ '11', '12' ],
    Questions: [
      {
        Type: 'StarRating',
        IsMandatory: true,
        Position: 0,
        Text: 'Rate with stars'
      },
      {
        Type: 'Options',
        IsMandatory: false,
        Position: 1,
        Text: 'Want some options?',
        Options: [
          {
            Position: 1,
            Text: 'Option 1'
          },
          {
            Position: 2,
            Text: 'Option 2'
          }
        ],
        IsOptionNumberDisplayed: true,
        IsSupportingQuestionEnabled: true,
        SupportingQuestion: 'Use this follow up?'
      },
      {
        Type: 'Text',
        IsMandatory: false,
        Position: 2,
        Text: 'How was the course?'
      },
      {
        Type: 'Nps',
        IsMandatory: true,
        Position: 3,
        Text: ''
      },
    ]
  },
  {
    Id: '11',
    FormType: 'Evaluation',
    FormSubType: 'FollowUp',
    Title: null,
    IsMandatory: false,
    IsSystemProvided: false,
    IssueDelayDays: 11,
    RelatedFormTemplateIds: [],
    Questions: [
      {
        Type: 'Options',
        IsMandatory: false,
        Position: 0,
        Text: 'Want some options?',
        Options: [
          {
            Position: 1,
            Text: 'Option 1'
          },
          {
            Position: 2,
            Text: 'Option 2'
          }
        ],
        IsOptionNumberDisplayed: true,
        IsSupportingQuestionEnabled: true,
        SupportingQuestion: 'Use this follow up?'
      },
    ]
  },
  {
    Id: '12',
    FormType: 'Evaluation',
    FormSubType: 'FollowUp',
    Title: null,
    IsMandatory: false,
    IsSystemProvided: false,
    IssueDelayDays: 7,
    RelatedFormTemplateIds: [],
    Questions: [
      {
        Type: 'Text',
        IsMandatory: false,
        Position: 0,
        Text: 'How was the course?'
      },
    ]
  },
];

const courseSettings = [
  {
    Id: 0,
    FormType: 'Evaluation',
    ObjectId: '0000-0000-0000-0000',
    IsEnabled: true,
    IsMandatory: false,
    IsDefaultTemplateEnabled: false,
    TemplateId: '2'
  }
];

const eventSettings = [
  {
    Id: 1,
    FormType: 'Evaluation',
    ObjectId: '1-11-111-1111',
    IsEnabled: true,
    IsMandatory: true,
    IsDefaultTemplateEnabled: true,
    TemplateId: '3'
  }
];

const lessonSettings = [
  {
    Id: 2,
    FormType: 'Evaluation',
    ObjectId: '2-22-222-2222',
    IsEnabled: true,
    IsMandatory: false,
    TemplateId: '2'
  }
];

const userForms = [
  {
    Id: '03',
    FormType: 'Evaluation',
    FormSubType: 'StandardReflection',
    DateLastEdited: '2017-07-24T10:07:33.364Z',
    DateCompleted: '2017-07-22T10:07:33.364Z',
    Title: 'Form 3',
    ObjectId: '3',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
      {
        Type: 'DateTime',
        Text: 'When did you finish it?',
        Answer: 'some-date'
      },
    ]
  },
  {
    Id: '01',
    FormType: 'Evaluation',
    FormSubType: 'SRAReflection',
    DateLastEdited: '2017-08-05T10:07:33.364Z',
    DateCompleted: '2017-08-04T10:07:33.364Z',
    Title: 'Form 1',
    ObjectId: '1',
    Questions: [
      {
        Type: 'DateTime',
        Text: 'When did you finish it?',
        Answer: '2017-08-05T10:07:33.364Z'
      },
    ]
  },
  {
    Id: '02',
    FormType: 'Evaluation',
    FormSubType: 'SRAReflection',
    DateLastEdited: '2017-08-04T10:07:33.364Z',
    DateCompleted: '2017-08-03T10:07:33.364Z',
    Title: 'Form 2',
    ObjectId: null,
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '04',
    FormType: 'Evaluation',
    FormSubType: 'StandardReflection',
    DateLastEdited: '2017-06-15T10:07:33.364Z',
    DateCompleted: '2017-06-13T10:07:33.364Z',
    Title: 'Form 4',
    ObjectId: '4',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '05',
    FormType: 'Evaluation',
    FormSubType: 'StandardReflection',
    DateLastEdited: '2017-06-25T10:07:33.364Z',
    DateCompleted: '2017-06-05T10:07:33.364Z',
    Title: 'Form 5',
    ObjectId: '4',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '06',
    FormType: 'Evaluation',
    FormSubType: 'SRAReflection',
    DateLastEdited: '2017-08-05T10:07:33.364Z',
    DateCompleted: '2017-08-04T10:07:33.364Z',
    Title: 'Form 6',
    ObjectId: '1',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '07',
    FormType: 'Evaluation',
    FormSubType: 'SRAReflection',
    // DateLastEdited: null,
    DateCompleted: '2017-08-03T10:07:33.364Z',
    Title: 'Form 7',
    ObjectId: null,
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '08',
    FormType: 'Evaluation',
    FormSubType: 'StandardReflection',
    DateLastEdited: '2017-07-25T10:07:33.364Z',
    DateCompleted: '2017-07-22T10:07:33.364Z',
    Title: 'Form 8',
    ObjectId: '3',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '09',
    FormType: 'Evaluation',
    FormSubType: 'StandardReflection',
    DateLastEdited: '2017-06-25T10:07:33.364Z',
    DateCompleted: '2017-06-13T10:07:33.364Z',
    Title: 'Form 9',
    ObjectId: '4',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '10',
    FormType: 'Evaluation',
    FormSubType: 'StandardReflection',
    DateLastEdited: '2017-06-06T10:07:33.364Z',
    DateCompleted: '2017-06-05T10:07:33.364Z',
    Title: 'Form 10',
    ObjectId: '4',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '11',
    FormType: 'Evaluation',
    FormSubType: 'StandardReflection',
    DateLastEdited: '2017-06-15T10:07:33.364Z',
    DateCompleted: '2017-06-05T10:07:33.364Z',
    Title: 'Form 11',
    ObjectId: '4',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  },
  {
    Id: '12',
    FormType: 'Evaluation',
    FormSubType: 'StandardReflection',
    DateLastEdited: '2017-08-05T10:07:33.364Z',
    DateCompleted: '2017-06-05T10:07:33.364Z',
    Title: 'Form 12',
    ObjectId: '4',
    Questions: [
      {
        Text: 'How was the course?',
        Answer: 'It was fine.'
      },
      {
        Text: 'Are you sure?',
        Answer: 'Yes'
      },
      {
        Text: 'And how are you?',
        Answer: 'I am good.'
      },
    ]
  }
];

const courses = [
  {
    Id: '1',
    Title: 'Badgers for beginners'
  },
  {
    Id: '2',
    Title: 'Badgers for intermediates'
  },
  {
    Id: '3',
    Title: 'Badgers for experts'
  },
  {
    Id: '4',
    Title: 'Honey badgers'
  },
  {
    Id: '444555',
    Title: 'Fire safety basics',
    Lessons: [{
      Id: '444555_1',
      Title: 'Fire safety practical with fire professional',
      IsEnabled: true,
      Type: 'InstructorLed'
    }, {
      Id: '444555_2',
      Title: 'Fire safety basics introduction',
      IsEnabled: true,
      Type: 'ELearning'
    }, {
      Id: '444555_3',
      Title: 'Fire safety basics advanced',
      IsEnabled: true,
      Type: 'ELearning'
    }, {
      Id: '444555_4',
      Title: 'Fire safety basics specialising in fire extinguishers',
      IsEnabled: true,
      Type: 'ELearning'
    }, {
      Id: '444555_5',
      Title: 'Fire safety mega advanced',
      IsEnabled: false,
      Type: 'ELearning'
    }, {
      Id: '444555_6',
      Title: 'Fire safety URL lesson',
      IsEnabled: false,
      Type: 'ELearning'
    }]
  }
];
const lesson = 
  {
    Code: 'Lesson Code',
    Id: '0b5932f0-8215-11e9-a416-7dae4a51c929',
    IsEnabled: true,
    Type: 'DocumentUpload',
    CategoryId: '03',
    ImageFileName: 'bulgaria.jpg',
    Details: [{
      Description: 'Please upload your certificate to complete this course.',
      Title: 'Lesson Title',
    }]
  };

const userGroups = [
  {
    Id: '1',
    Title: 'Badgers'
  },
  {
    Id: '2',
    Title: 'Monkeys'
  },
  {
    Id: '3',
    Title: 'Opposums'
  },
  {
    Id: '4',
    Title: 'Mammuts'
  },
  {
    Id: '5',
    Title: 'Mammuuuuuuuuuuuuuuuuuuuuuuuuuuts Mammuuuuuuuuuuuuuuuuuuuuuuuuuuts Mammuuuuuuuuuuuuuuuuuuuuuuuuuuts'
  },
  {
    Id: '6',
    Title: 'Group A'
  },
  {
    Id: '7',
    Title: 'Group B'
  },
  {
    Id: '8',
    Title: 'Group C'
  },
];

const person = {};

const validUserGroupCheck = {
  Id: 'some-id',
  Title: 'This is the group title'
};

const competencyCheck = {
  Id: 'someidtotest',
  DefaultCulture: 'en-GB',
  Duration: 5,
  UserDefinedIdentifier: '001-test',
  IsEnabled: false,
  CategoryId: '03',
  ImageFileName: 'bulgaria.jpg',
  Details: [
    {
      Culture: 'en-GB',
      Title: 'Coffee making',
      Duration: 5,
      Tasks: [
        {
          Position: 0,
          Title: 'Grinding the coffee',
          Instructions: 'Check whether the barista knows how to grind the coffee',
        }
      ]
    },
    {
      Culture: 'bg-BG',
      Title: 'Правене на кафе',
      Tasks: [
        {
          Position: 0,
          Title: 'Смилане не кафето',
          Instructions: 'Проверете дали ортака знае как да смели кафето',
        }
      ]
    },
    {
      Culture: 'ru-RU',
      // Title: '',
      Tasks: [
        {
          Position: 0,
          // Title: '',
          // Instructions: '',
        }
      ]
    },
    {
      Culture: 'fi-FI',
      Title: '',
      Tasks: [
        {
          Position: 0,
          Title: '',
          Instructions: '',
        }
      ]
    },
    {
      Culture: 'en-US',
      Title: '',
      Tasks: [
        {
          Position: 0,
          Title: '',
          Instructions: '',
        }
      ]
    },
    {
      Culture: 'sr-LATN-RS',
      Title: '',
      Tasks: [
        {
          Position: 0,
          Title: '',
          Instructions: '',
        }
      ]
    },
    {
      Culture: 'fr-FR',
      Title: '',
      Tasks: [
        {
          Position: 0,
          Title: '',
          Instructions: '',
        }
      ]
    },
  ]
};

const reviewMode = {
  Enabled: false
};

const reviewModeLessonData = {
  totalLessonCount: '10',
  reviewModeEnabledLessonCount: '3'
};

const multiBrandingMode = {
  Enabled: false
};

const currentUser = {
  Id: 'someId',
  Culture: 'en-GB',
  // Culture: 'bg-BG',
  PersonalData: {
    Culture: 'en-GB',
    // Culture: 'bg-BG'
    // Culture: 'es-es'
  },
  HasCultureAssigned: true
};

const lessonCategories = [
  {
    Id: '01',
    Title: 'First Category'
  },
  {
    Id: '02',
    Title: 'Second Category'
  },
  {
    Id: '03',
    Title: 'Third Category'
  },
  {
    Id: '04',
    Title: 'Fourth Category'
  },
  {
    Id: '05',
    Title: 'Fifth Category'
  },
  {
    Id: '06',
    Title: 'Sixth Category'
  },
];

const lessonResults = {
  Count: 9,
  Items: [
    {
      PersonId: '0',
      FirstName: 'Adam',
      LastName: 'Baxter',
      UserName: 'badger',
      TrainingResults: [
        {
          TrainingResultId: '0b5952f0-8215-11e9-a416-7dae4a51c927',
          DateUpdated: '2015-01-05T10:07:33.364Z',
          Status: 'NotStarted'
        },
        {
          TrainingResultId: '2b5932f0-8215-11e9-a416-7dae4a51c928',
          DateUpdated: '2018-09-05T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'fire-safety-certificate-2018.pdf',
          DocumentDate: '2018-06-01'
        },
        {
          TrainingResultId: '2b5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2018-07-05T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'firesafetycertificatefiresafetycertificatefiresafetycertificate2018.pdf',
          DocumentDate: '2018-06-02'
        },
        {
          TrainingResultId: '2b5932f0-8215-11e9-a416-7dae4a51c930',
          DateUpdated: '2018-05-05T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'fire-safety-certificate-2018.pdf',
          DocumentDate: '2018-05-03'
        },
        {
          TrainingResultId: '2b5932f0-8215-11e9-a416-7dae4a51c931',
          DateUpdated: '2018-09-30T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'fire-safety-certificate-2018.pdf',
          DocumentDate: '2018-05-03'
        }
      ]
    },
    {
      PersonId: '1',
      FirstName: 'Kurt',
      LastName: 'Kobain',
      UserName: 'worm',
      TrainingResults: [
        {
          TrainingResultId: '3b5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2015-06-05T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'fire-safety-certificate-2015.pdf',
          DocumentDate: '2015-06-01'
        },
        {
          TrainingResultId: '0p5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2017-06-05T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'first-aid-certificate-2017.pdf',
          DocumentDate: '2017-06-03'
        }
      ]
    },
    {
      PersonId: '2',
      FirstName: 'Kurt',
      LastName: 'Angle',
      UserName: 'owl',
      TrainingResults: [
        {
          TrainingResultId: '3m5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2018-06-05T10:07:33.364Z',
          Status: 'NotStarted'
        },
        {
          TrainingResultId: 'jp5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2017-06-05T10:07:33.364Z',
          Status: 'NotStarted'
        }
      ]
    },
    {
      PersonId: '3',
      FirstName: 'Adam',
      LastName: 'White',
      UserName: 'cat',
      TrainingResults: [
        {
          TrainingResultId: '3m5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2015-09-05T10:07:33.364Z',
          Status: 'Failed'
        },
        {
          TrainingResultId: 'ip5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2018-06-09T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'managing-manager-certificate-2018.pdf',
          DocumentDate: '2017-06-03'
        },
        {
          TrainingResultId: 'pp5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2017-06-05T10:07:33.364Z',
          Status: 'Failed'
        }
      ]
    },
    {
      PersonId: '4',
      FirstName: 'Kirstie',
      LastName: 'Sheldon',
      UserName: 'bat',
      TrainingResults: [
        {
          TrainingResultId: 'ip5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2017-06-11T10:07:33.364Z',
          Status: 'Complete'
        }
      ]
    },
    {
      PersonId: '5',
      FirstName: 'Kerri',
      LastName: 'Robins',
      UserName: 'horse',
      TrainingResults: [
        {
          TrainingResultId: 'ip5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2017-06-10T10:07:33.364Z',
          Status: 'Failed'
        }
      ]
    },
    {
      PersonId: '6',
      FirstName: 'Juliette',
      LastName: 'Angle',
      UserName: 'dog',
      TrainingResults: [
        {
          TrainingResultId: '3m5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2016-06-05T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'fire-safety-certificate-2016.pdf',
          DocumentDate: '2016-06-02'
        },
        {
          TrainingResultId: 'ip5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2017-02-05T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'fire-safety-certificate-2017-test-long-name-here-test-long-name-here-test-long-name-here-.pdf',
          DocumentDate: '2017-01-07'
        }
      ]
    },
    {
      PersonId: '7',
      FirstName: 'Natasha',
      LastName: 'Draper',
      UserName: 'frog',
      TrainingResults: [
        {
          TrainingResultId: 'mi5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2017-02-09T10:07:33.364Z',
          Status: 'NotStarted'
        }
      ]
    },
    {
      PersonId: '8',
      FirstName: 'Gemma',
      LastName: 'Walker',
      UserName: 'goat',
      TrainingResults: [
        {
          TrainingResultId: 'mi5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2016-02-05T10:07:33.364Z',
          Status: 'NotStarted'
        },
        {
          TrainingResultId: 'ip5932f0-8215-11e9-a416-7dae4a51c929',
          DateUpdated: '2017-02-03T10:07:33.364Z',
          Status: 'Complete',
          DocumentFileName: 'first-aid-certificate-2017.pdf',
          DocumentDate: '2017-02-01'
        }
      ]
    },
  ]
};

let courseComponents = {
  444555: [
    {
      Id: '444555_1',
      Type: 'InstructorLed',
      DefaultCulture: 'en-GB',
      IsEnabled: true,
      Details: [
        {
          Culture: 'en-GB',
          Title: 'Fire safety practical with fire professional'
        },
        {
          Culture: 'bg-BG',
          Title: 'Пожарна безопастност 1'
        }
      ]
    },
    {
      Id: '444555_2',
      Type: 'ELearning',
      DefaultCulture: 'en-GB',
      IsEnabled: true,
      Details: [
        {
          Culture: 'en-GB',
          Title: 'Fire safety basics introduction'
        },
        {
          Culture: 'bg-BG',
          Title: 'Пожарна безопастност 2'
        }
      ]
    },
    {
      Id: '444555_3',
      Type: 'ELearning',
      DefaultCulture: 'en-GB',
      IsEnabled: true,
      Details: [
        {
          Culture: 'en-GB',
          Title: 'Fire safety basics advanced'
        },
        {
          Culture: 'bg-BG',
          Title: 'Пожарна безопастност 3'
        }
      ]
    },
    {
      Id: '444555_4',
      Type: 'ELearning',
      DefaultCulture: 'en-GB',
      IsEnabled: true,
      Details: [
        {
          Culture: 'en-GB',
          Title: 'Fire safety basics specialising in fire extinguishers'
        },
        {
          Culture: 'bg-BG',
          Title: 'Пожарна безопастност 4'
        }
      ]
    },
    {
      Id: '444555_5',
      Type: 'ELearning',
      DefaultCulture: 'en-GB',
      IsEnabled: true,
      Details: [
        {
          Culture: 'en-GB',
          Title: 'Fire safety mega advanced'
        },
        {
          Culture: 'bg-BG',
          Title: 'Пожарна безопастност 5'
        }
      ]
    },
    {
      Id: '444555_6',
      Type: 'ELearning',
      DefaultCulture: 'en-GB',
      IsEnabled: true,
      Details: [
        {
          Culture: 'en-GB',
          Title: 'Fire safety URL lesson'
        },
        {
          Culture: 'bg-BG',
          Title: 'Пожарна безопастност 6'
        }
      ]
    },
    {
      Id: '444555_7',
      Type: 'CompetencyCheck',
      DefaultCulture: 'en-GB',
      IsEnabled: true,
      Details: [
        {
          Culture: 'en-GB',
          Title: 'Competency check lesson - Fire safety URL lesson'
        },
        {
          Culture: 'bg-BG',
          Title: 'Пожарна безопастност 6'
        }
      ]
    },
    {
      Id: '444555_8',
      Type: 'ELearning',
      DefaultCulture: 'en-GB',
      IsEnabled: false,
      Details: [
        {
          Culture: 'en-GB',
          Title: 'Not enabled lesson - Fire safety URL lesson'
        },
        {
          Culture: 'bg-BG',
          Title: 'Пожарна безопастност 6'
        }
      ]
    }
  ]
};

  let managersGroups = {
    12345: [
      {
        Name: 'Ivaylo Iliev',
        Email: 'ivaylo@mail.com',
        Position: 'Front End Developer',
        Id: '1',
      },
      {
        Name: 'Denislava Ilieva',
        Email: 'sarah@mail.com',
        Position: 'UI Designer',
        Id: '2',
      },
      {
        Name: 'Derric Mugoya',
        Email: 'derric@mail.com',
        Position: 'Civil Engineer',
        Id: '3',
      },
      {
        Name: 'Paolo Ferrara',
        Email: 'paolo@mail.com',
        Position: 'Architect',
        Id: '4',
      },
      {
        Name: 'Danny Hines',
        Email: 'danny@gmail.com',
        Position: 'Business',
        Id: '5',
      },
      {
        Name: 'Beth Mclaren',
        Email: 'beth@outlook.com',
        Position: 'Music',
        Id: '6',
      },
      {
        Name: 'Clear Gravy',
        Email: 'clear@outlook.com',
        Position: 'Music',
        Id: '7',
      }
    ]
  }

 let selectionGroups = {
   444555: [
     {
       Id: 'some-id-for-selection-groups',
       // Title: 'Fire safety basic sub-group',
       DefaultCulture: 'en-GB',
       Details: [
         {
           Culture: 'en-GB',
           Title: 'Fire safety basic sub-group'
         },
         {
           Culture: 'bg-BG',
           Title: 'Под-група за пожарна безопастност'
         }
       ],
       Components: [
         // '444555_1',
         // '444555_2',
         // '444555_3',
         // '444555_4',
         '444555_5',
         '444555_8'
       ]
     }
   ]
 };

/* let selectionGroups = {
  444555: []
}; */

const licenceResponse = {
  EnabledFeatures: {
    AllCoursesCarousel: true,
    CompetencyChecks: true,
    CourseRecommendations: true,
    Events: true,
    MultiBranding: true,
    UseAssetServiceForImages: false,
  },
  Languages: [
    'en-GB',
    'bg-BG',
    'ru-RU',
    'fi-FI',
    'en-US',
    'sr-LATN-RS',
    'fr-FR',
    'hu-HU'
  ]
};

module.exports = {
  licenceResponse,
  settings,
  forms,
  courseSettings,
  eventSettings,
  lessonSettings,
  userForms,
  courses,
  lesson,
  userGroups,
  person,
  validUserGroupCheck,
  competencyCheck,
  reviewMode,
  reviewModeLessonData,
  currentUser,
  lessonCategories,
  lessonResults,
  multiBrandingMode,
  courseComponents,
  selectionGroups,
  managersGroups
};
