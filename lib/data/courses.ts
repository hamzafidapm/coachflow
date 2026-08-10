export type VideoSourceType = 'PLAYLIST' | 'SINGLE';

export type CourseSeed = {
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImageUrl: string;
  videoSourceUrl: string;
  videoSourceType: VideoSourceType;
  moduleCount: number;
  students: number;
};

// Seed data for the 6 courses. Mirrors the Prisma `Course` model shape so this
// can be swapped for a `prisma.course.findMany()` call once DATABASE_URL points
// at a real Neon database.
export const courses: CourseSeed[] = [
  {
    slug: 'web-development-bootcamp',
    title: 'Web Development Bootcamp',
    category: 'Web Development',
    description: 'HTML, CSS, JavaScript and React from first tag to deploy.',
    coverImageUrl: '/covers/web-development.png',
    videoSourceUrl: 'https://youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w',
    videoSourceType: 'PLAYLIST',
    moduleCount: 139,
    students: 486,
  },
  {
    slug: 'python-for-beginners-to-advanced',
    title: 'Python for Beginners to Advanced',
    category: 'Programming',
    description: 'Syntax to OOP, automation scripts and packaging.',
    coverImageUrl: '/covers/python.png',
    videoSourceUrl: 'https://youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg',
    videoSourceType: 'PLAYLIST',
    moduleCount: 100,
    students: 612,
  },
  {
    slug: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms',
    category: 'Computer Science',
    description: 'Arrays to graphs, with interview-grade problem sets.',
    coverImageUrl: '/covers/dsa.png',
    videoSourceUrl: 'https://youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi',
    videoSourceType: 'PLAYLIST',
    moduleCount: 92,
    students: 529,
  },
  {
    slug: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    category: 'Security',
    description: 'Threat models, network defence and hands-on labs.',
    coverImageUrl: '/covers/cybersecurity.png',
    videoSourceUrl: 'https://youtu.be/v3iUx2SNspY',
    videoSourceType: 'SINGLE',
    moduleCount: 1,
    students: 274,
  },
  {
    slug: 'cloud-computing-with-aws',
    title: 'Cloud Computing with AWS',
    category: 'Cloud / DevOps',
    description: 'EC2, S3, IAM and CI/CD pipelines end to end.',
    coverImageUrl: '/covers/cloud-aws.png',
    videoSourceUrl: 'https://youtu.be/N4sJj-SxX00',
    videoSourceType: 'SINGLE',
    moduleCount: 1,
    students: 358,
  },
  {
    slug: 'ui-ux-design-fundamentals',
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    description: 'Research, wireframes, design systems and handoff.',
    coverImageUrl: '/covers/uiux.png',
    videoSourceUrl: 'https://youtu.be/h87xnT004Aw',
    videoSourceType: 'SINGLE',
    moduleCount: 1,
    students: 341,
  },
];

export function metaLabel(course: CourseSeed) {
  return course.videoSourceType === 'PLAYLIST' ? `${course.moduleCount} videos` : 'Single comprehensive course';
}

// Named entries for playlist-based courses: [title, duration]. Stand-in titles —
// swap for the real ones (e.g. via the YouTube Data API) once an API key is available.
export const playlistTitles: Record<string, [string, string][]> = {
  'web-development-bootcamp': [
    ['How the web actually works', '11:24'],
    ['HTML structure & semantics', '18:40'],
    ['CSS layout: flexbox', '22:05'],
    ['CSS grid & responsive rules', '25:12'],
    ['JavaScript fundamentals', '31:58'],
    ['DOM & events', '27:33'],
    ['Fetch, APIs and async', '24:47'],
    ['Intro to React', '35:02'],
    ['State & component patterns', '29:19'],
    ['Routing and forms', '21:56'],
    ['Build & deploy', '19:08'],
    ['Capstone walkthrough', '42:31'],
  ],
  'python-for-beginners-to-advanced': [
    ['Setup & first script', '09:52'],
    ['Variables and types', '16:31'],
    ['Control flow', '18:14'],
    ['Functions & scope', '20:47'],
    ['Lists, dicts, sets', '23:05'],
    ['Files and exceptions', '17:44'],
    ['Modules & packaging', '21:19'],
    ['OOP: classes', '28:36'],
    ['Decorators & generators', '26:02'],
    ['Working with APIs', '24:15'],
    ['Data with pandas', '33:40'],
    ['Automation scripts', '29:07'],
    ['Testing basics', '18:58'],
    ['Final project', '46:12'],
  ],
  'data-structures-algorithms': [
    ['Complexity & Big-O', '19:33'],
    ['Arrays and strings', '24:18'],
    ['Linked lists', '27:41'],
    ['Stacks & queues', '21:07'],
    ['Hash tables', '25:52'],
    ['Recursion patterns', '30:14'],
    ['Sorting algorithms', '34:26'],
    ['Binary search', '18:49'],
    ['Trees & traversals', '32:03'],
    ['Binary search trees', '28:37'],
    ['Heaps & priority queues', '23:11'],
    ['Graphs: BFS & DFS', '36:45'],
    ['Shortest paths', '31:22'],
    ['Dynamic programming I', '38:09'],
    ['Dynamic programming II', '35:54'],
    ['Interview problem set', '44:30'],
  ],
};

// Chapters for single-video courses: [title, display timestamp, seconds].
export const chapters: Record<string, [string, string, number][]> = {
  'cybersecurity-fundamentals': [
    ['Course introduction', '0:00', 0],
    ['Threat landscape today', '6:40', 400],
    ['CIA triad & risk basics', '18:20', 1100],
    ['Networking for defenders', '32:00', 1920],
    ['Attacks: phishing to ransomware', '51:40', 3100],
    ['Cryptography essentials', '1:12:00', 4320],
    ['Access control & identity', '1:31:40', 5500],
    ['Hands-on lab walkthrough', '1:53:20', 6800],
    ['Incident response', '2:15:00', 8100],
    ['Career paths & certs', '2:30:00', 9000],
  ],
  'cloud-computing-with-aws': [
    ['What cloud computing is', '0:00', 0],
    ['AWS global infrastructure', '8:20', 500],
    ['IAM: users, roles, policies', '21:40', 1300],
    ['EC2 and compute', '40:00', 2400],
    ['S3 and storage classes', '1:03:20', 3800],
    ['VPC and networking', '1:25:00', 5100],
    ['Databases: RDS & DynamoDB', '1:46:40', 6400],
    ['CI/CD pipelines', '2:08:20', 7700],
    ['Monitoring & cost control', '2:26:40', 8800],
    ['Deploying the final project', '2:45:00', 9900],
  ],
  'ui-ux-design-fundamentals': [
    ['What UX really means', '0:00', 0],
    ['Research & interviews', '7:30', 450],
    ['Personas and journeys', '19:10', 1150],
    ['Information architecture', '31:40', 1900],
    ['Wireframing basics', '45:00', 2700],
    ['Visual hierarchy & type', '1:01:40', 3700],
    ['Color and contrast', '1:16:40', 4600],
    ['Design systems & components', '1:33:20', 5600],
    ['Prototyping & testing', '1:51:40', 6700],
    ['Developer handoff', '2:08:20', 7700],
  ],
};
