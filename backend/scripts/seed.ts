import client, { connectToDB } from '../src/db/db';
import bcrypt from 'bcrypt';

async function seed() {
  await connectToDB();
  console.log('Seeding demo users...');

  try {
    const passwordHash = await bcrypt.hash('Password123', 12);

    // 2. Create 20 Users
    const users = [];
    for (let i = 1; i <= 20; i++) {
        const res = await client.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name',
            [`Demo User ${i}`, `user${i}@example.com`, passwordHash]
        );
        users.push(res.rows[0]);
    }
    console.log(`Created ${users.length} users`);

    // 3. Create 5 Projects
    const projects = [];
    for (let i = 1; i <= 5; i++) {
        const res = await client.query(
            'INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING id, name',
            [`Project ${i}`, `Description for project ${i}`, users[i % 20].id]
        );
        projects.push(res.rows[0]);
    }
    console.log(`Created ${projects.length} projects`);

    // 4. Assign members to projects
    for (const project of projects) {
        for (let j = 0; j < 5; j++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            await client.query(
                'INSERT INTO project_members (project_id, user_id, role) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
                [project.id, randomUser.id, j === 0 ? 'admin' : 'member']
            );
        }
    }
    console.log('Assigned members to projects');

    // 5. Create 100 Tasks
    for (let i = 1; i <= 100; i++) {
        const project = projects[Math.floor(Math.random() * projects.length)];
        const creator = users[Math.floor(Math.random() * users.length)];
        const assignee = users[Math.floor(Math.random() * users.length)];
        const status = ['todo', 'in_progress', 'completed'][Math.floor(Math.random() * 3)];
        const priority = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];

        await client.query(
            'INSERT INTO tasks (title, description, project_id, status, priority, assignee_id, creator_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [`Task ${i}`, `Details for task ${i}`, project.id, status, priority, assignee.id, creator.id]
        );
    }
    console.log('Created 100 tasks');

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    process.exit(0);
  }
}

seed();

