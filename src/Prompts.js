// Prompts from https://thinkwritten.com/poetry-prompts/.  I'm 99.9% sure this is transformative use.

const Prompts = [
    'Something that will always be out of reach.',
    'Write a poem where each line/sentence is about each day of last week.',
    'What does your favorite color taste like?',
    'Write a poem on how to do something mundane most people take for granted, such as how to tie your shoes, how to turn on a lamp, how to pour a cup of coffee.',
    'What are some key differences and similarities between two people you know?',
    'Write about the feelings you experience or things you notice while waiting for something.',
    'Imagine wherever you are right now that the clock stops and all the people in the world are frozen in place. What are they doing?',
    'Choose a spice from your kitchen cabinet, and relate its flavor to an event that has happened recently in your daily life.',
    'Imagine you, but in a completely different life based on making a different decision that impacted everything else.',
    'Create a piece based on a science experiment going terribly, terribly wrong.',
    'Make each line about different people you have met but lost contact with over the years.',
    'Think about something you own that is broken, and write about possible ways to fix it. Duct tape? A hammer and nails?',
    'Pretend you are a detective and you have to narrow down the suspects.',
    'Think of a time you had to stand in line for something. Maybe you were waiting in a check-out line at the store, or you had to stand in line to enter a concert or event.',
    'Write your poem in the form of a recipe. This can be for something tangible, such as a cake, or it can be a more abstract concept such as love or happiness. List ingredients and directions for mixing and tips for cooking up your concept to perfection.',
    'What is it like after all the party guests go home?',
    'Can you trust someone you have doubted in the past?',
    'Write about what it feels like when no one understands or agrees with your opinion.',
    'Write a poem from the perspective of a high-profile criminal who is always on the run from law enforcement.',
    'Write a poem about what training you might be doing to accomplish a difficult challenge in your life.',
    'Write about an experience that made you feel trapped.',
    'Write a poem about noticing something interesting while passing by a church near your home.',
    'Write an ode to your first car.',
    'Write about a recent or memorable experience when nothing went according to plan.',
    'Imagine you are hired to design a building for a humanitarian cause you are passionate about.',
    'Write about someone who owns far too many cats.',
    'Write a poem from the perspective of a queen.',
    'Think of a recent movie you watched, and create a poem about one character specifically, or an interaction between two characters that was memorable.',
    'Write about an experience where you had a lot of potential for success, but failed.',
    'Write about an experience in the moonlight.',
    'Write about trying to always keep everything perfect.',
    'Write a poem where you tell someone they are wrong and why.',
    'Write a poem using sarcasm as a form of illustrating your point.',
    'Find the good in something terrible.',
    'Write a poem that explains how to drive to a teenager.',
    'Imagine there are ladders that take you up to the clouds. What could be up there? What feelings do you have about climbing the ladders, or is their a mystery as to how they got there in the first place?',
    'What would it be like if you felt like someone was watching you but no one believed you?',
    'How has a place you are familiar with changed over the past 10 years?',
    'Write a poem about a time you were thankful for shelter from a storm.',
    'Create a poem inspired by the people who might be eating lunch in a cafeteria at school or at a hospital.'
];

export function getPrompts(n, random) {
    return random.Shuffle(Prompts).slice(0, n).map(x => [x]);
}