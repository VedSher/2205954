import { faker } from '@faker-js/faker';

// Generate deterministic but random-looking data based on endpoint
export const generateMockData = (endpoint) => {
  // Set a seed to ensure consistent data between renders
  faker.seed(42);
  
  switch (endpoint) {
    case '/users':
      return generateUsers(20);
    case '/posts':
      return generatePosts(50);
    case '/comments':
      return generateComments(200);
    default:
      return [];
  }
};

const generateUsers = (count) => {
  const users = [];
  for (let i = 1; i <= count; i++) {
    users.push({
      id: i,
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    });
  }
  return users;
};

const generatePosts = (count) => {
  const posts = [];
  const now = new Date();
  
  for (let i = 1; i <= count; i++) {
    // Create posts with timestamps spread over the last 30 days
    const randomDaysAgo = faker.number.int({ min: 0, max: 30 });
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - randomDaysAgo);
    timestamp.setHours(faker.number.int({ min: 0, max: 23 }));
    timestamp.setMinutes(faker.number.int({ min: 0, max: 59 }));
    
    posts.push({
      id: i,
      userId: faker.number.int({ min: 1, max: 20 }),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(1),
      timestamp: timestamp.toISOString(),
    });
  }
  
  return posts;
};

const generateComments = (count) => {
  const comments = [];
  for (let i = 1; i <= count; i++) {
    comments.push({
      id: i,
      postId: faker.number.int({ min: 1, max: 50 }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      body: faker.lorem.paragraph(),
    });
  }
  return comments;
};