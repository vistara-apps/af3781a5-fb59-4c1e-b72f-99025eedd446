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
      'Keep hands visible',
      'Remain calm and polite',
      'You can refuse searches without a warrant',
      'Ask "Am I free to go?"'
    ]
  },
  {
    id: '2',
    title: 'Street Encounter Rights',
    state: 'New York',
    content: 'You have the right to walk away unless you are being detained.',
    keyPoints: [
      'Ask if you are being detained',
      'You can refuse to answer questions',
      'Do not resist physically',
      'Remember badge numbers and faces'
    ]
  }
];
