import client, { connectToDB } from '../src/db/db';

async function test() {
    await connectToDB();
    console.log('Testing invite logic...');

    try {
        // Try to invite a user
        const projectId = 1; // Assuming Project 1 exists
        const email = 'user2@example.com'; 
        const role = 'member';

        const userRes = await client.query('SELECT id FROM users WHERE email = $1', [email]);
        if (userRes.rows.length === 0) {
            console.log('User not found');
            return;
        }
        const targetUserId = userRes.rows[0].id;
        console.log(`Target User ID: ${targetUserId}`);

        const memberCheck = await client.query(
          'SELECT id FROM project_members WHERE project_id = $1 AND user_id = $2',
          [projectId, targetUserId]
        );
        console.log(`Member check length: ${memberCheck.rows.length}`);

        if (memberCheck.rows.length > 0) {
          console.log('User is already a member');
          return;
        }

        await client.query(
          'INSERT INTO project_members (project_id, user_id, role) VALUES ($1, $2, $3)',
          [projectId, targetUserId, role]
        );
        console.log('User invited successfully!');
    } catch (err) {
        console.error('Invite logic failed:', err);
    } finally {
        process.exit(0);
    }
}

test();
