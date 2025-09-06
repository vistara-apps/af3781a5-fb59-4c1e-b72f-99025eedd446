export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export const SCENARIOS = [
  'Traffic Stop',
  'Street Encounter',
  'Home Visit',
  'Workplace Interaction',
  'Public Space Encounter',
  'Airport/Border Crossing'
];

export const SAMPLE_RIGHTS_CARDS = [
  {
    id: '1',
    title: 'Traffic Stop Rights',
    state: 'California',
    content: 'You have the right to remain silent. You must provide license, registration, and insurance if requested.',
    keyPoints: [
      'Keep hands visible on steering wheel',
      'Remain calm and polite',
      'You can refuse searches without a warrant',
      'Ask "Am I free to go?" when interaction seems complete'
    ]
  },
  {
    id: '2',
    title: 'Street Encounter Rights',
    state: 'New York',
    content: 'You have the right to walk away unless you are being detained.',
    keyPoints: [
      'Ask "Am I being detained?" clearly',
      'You can refuse to answer questions',
      'Do not resist physically',
      'Remember badge numbers and faces'
    ]
  },
  {
    id: '3',
    title: 'Home Visit Rights',
    state: 'Texas',
    content: 'Police need a warrant to enter your home unless there are emergency circumstances.',
    keyPoints: [
      'Ask to see the warrant',
      'You can speak through the door',
      'Do not consent to entry without a warrant',
      'You have the right to remain silent'
    ]
  },
  {
    id: '4',
    title: 'Workplace Interaction Rights',
    state: 'Florida',
    content: 'You have rights even at your workplace during police interactions.',
    keyPoints: [
      'You can remain silent',
      'Ask if you are free to leave',
      'Request to speak with a lawyer',
      'Do not consent to searches of personal items'
    ]
  },
  {
    id: '5',
    title: 'Public Space Rights',
    state: 'Illinois',
    content: 'In public spaces, you have the right to record police interactions and remain silent.',
    keyPoints: [
      'You can record from a reasonable distance',
      'You have the right to remain silent',
      'Ask if you are being detained',
      'Do not interfere with police duties'
    ]
  },
  {
    id: '6',
    title: 'Airport/Border Rights',
    state: 'General',
    content: 'At borders and airports, some rights are limited but you still have basic protections.',
    keyPoints: [
      'You can remain silent beyond basic identification',
      'You can refuse to unlock devices (with consequences)',
      'Ask for a supervisor if needed',
      'Know that searches are more permissible at borders'
    ]
  }
];
